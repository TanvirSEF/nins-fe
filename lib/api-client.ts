const BASE = process.env.NEXT_PUBLIC_API_URL || 'https://nins.zephlotech.com/api';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public messages: string[]
  ) {
    super(messages.join('; '));
    this.name = 'ApiError';
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    const body = await res.json().catch(() => ({}));
    const msgs = Array.isArray(body.message)
      ? body.message
      : [body.message || 'Request failed'];
    return new ApiError(body.statusCode ?? res.status, msgs);
  }
}

type Options = RequestInit & {
  json?: unknown;
  params?: Record<string, string | number | undefined>;
  token?: string | null;
  /** return raw Response (for blob/PDF downloads) instead of parsed JSON */
  raw?: boolean;
};

export async function apiClient<T>(endpoint: string, opts: Options = {}): Promise<T> {
  const { json, params, token, raw, headers, ...rest } = opts;

  let url = `${BASE}${endpoint}`;
  if (params) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) {
        sp.set(k, String(v));
      }
    }
    const queryString = sp.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const res = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
    cache: 'no-store', // Backend handles caching; disable Next fetch caching
  });

  if (raw) {
    if (!res.ok) {
      throw await ApiError.fromResponse(res);
    }
    return res as unknown as T; // Caller reads .blob() or similar
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msgs = Array.isArray(body.message)
      ? body.message
      : [body.message || 'Request failed'];
    throw new ApiError(body.statusCode ?? res.status, msgs);
  }

  const payload = await res.json();
  // Unwrap the { success, data } envelope
  return (payload?.data ?? payload) as T;
}

# syntax=docker/dockerfile:1.7
#
# NINS frontend (Next.js 16, standalone output) — production image.
# Stateless: the JWT lives in the browser and every API / Socket call goes to
# the remote backend (NEXT_PUBLIC_API_URL, inlined at BUILD time). No runtime
# secrets, no volumes.

############################
# 1. deps — install node_modules (cached layer)
############################
FROM node:22-bookworm-slim AS deps
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
# corepack honors the `packageManager` field in package.json (pnpm@10.33.4),
# so the exact pnpm version is used without manual pinning.
RUN corepack enable
WORKDIR /app

# Copy lockfile manifests first so this layer caches unless deps change.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

############################
# 2. builder — compile the app
############################
FROM node:22-bookworm-slim AS builder
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* is inlined into the client bundle at BUILD time, so the API URL
# must be supplied here (Dokploy build arg), not at runtime. The source default
# (https://nins.zephlotech.com/api) is used when the arg is unset.
ARG NEXT_PUBLIC_API_URL=https://nins.zephlotech.com/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

RUN pnpm build
# Escape hatch only: if next/image's sharp ever mis-traces into the standalone
# tree (e.g. after a platform change), run:
#   node node_modules/next/dist/bin/next trace .next/standalone/server.js

############################
# 3. runner — minimal production image
############################
FROM node:22-bookworm-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

WORKDIR /app

# Non-root runtime user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 --ingroup nodejs nextjs

# Standalone server bundles its own minimal node_modules. It does NOT copy
# static assets or public/, so add them explicitly.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# No curl/wget install: uses Node's built-in fetch against the /health route.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]

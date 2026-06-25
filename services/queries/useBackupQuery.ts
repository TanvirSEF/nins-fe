"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, ApiError } from "@/lib/api-client"
import { qk } from "@/lib/query-keys"
import { useAuth } from "@/hooks/useAuth"
import type { BackupInfo, BackupResult } from "@/types"

/**
 * Backup data layer (SUPER_ADMIN only). Backups live in R2 (mongodump →
 * tar.gz); there is no download/restore endpoint — just list, run, status.
 */

/** All backup objects in R2, newest first (GET /backup). */
export function useBackups() {
  const { token } = useAuth()
  return useQuery<BackupInfo[]>({
    queryKey: qk.backups,
    queryFn: () => apiClient<BackupInfo[]>("/backup", { method: "GET" }),
    enabled: !!token,
    staleTime: 30 * 1000,
  })
}

/** In-memory last backup result (GET /backup/status). */
export function useBackupStatus() {
  const { token } = useAuth()
  return useQuery<{ lastBackup: BackupResult | null }>({
    queryKey: qk.backupStatus,
    queryFn: () =>
      apiClient<{ lastBackup: BackupResult | null }>("/backup/status", {
        method: "GET",
      }),
    enabled: !!token,
    staleTime: 10 * 1000,
  })
}

/** Trigger an immediate backup (POST /backup/run). */
export function useRunBackup() {
  const qc = useQueryClient()
  return useMutation<BackupResult, ApiError, void>({
    mutationFn: () => apiClient<BackupResult>("/backup/run", { method: "POST" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["backup"] })
    },
  })
}

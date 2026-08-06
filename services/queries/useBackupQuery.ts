"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MOCK_BACKUPS, mockDelay } from "@/lib/mock-data"
import type { BackupInfo, BackupResult } from "@/types"
import { toast } from "sonner"

export function useBackups() {
  return useQuery<BackupInfo[]>({
    queryKey: ["backup", "list"],
    queryFn: () => Promise.resolve(MOCK_BACKUPS),
    initialData: MOCK_BACKUPS,
    staleTime: Infinity,
  })
}

export function useBackupStatus() {
  const lastBackup: BackupResult = {
    success: true,
    key: MOCK_BACKUPS[0].key,
    sizeBytes: MOCK_BACKUPS[0].size,
  }
  return useQuery<{ lastBackup: BackupResult | null }>({
    queryKey: ["backup", "status"],
    queryFn: () => Promise.resolve({ lastBackup }),
    initialData: { lastBackup },
    staleTime: Infinity,
  })
}

export function useRunBackup() {
  const qc = useQueryClient()
  return useMutation<BackupResult, Error, void>({
    mutationFn: async () => {
      await mockDelay(2000) // feels realistic for a backup
      return {
        success: true,
        key: `backup/nins-db-${new Date().toISOString().replace(/[:.]/g, "-")}.gz`,
        sizeBytes: 12582912,
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["backup"] })
      toast.success("Backup completed successfully (demo mode)")
    },
  })
}

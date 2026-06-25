"use client"

import * as React from "react"
import { format, isValid, parseISO } from "date-fns"
import { useBackups, useBackupStatus, useRunBackup } from "@/services/queries/useBackupQuery"
import { ApiError } from "@/lib/api-client"
import type { BackupInfo } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination } from "@/components/shared/Pagination"
import { DirectoryError } from "@/components/shared/DepartmentsDirectory"
import { toast } from "sonner"
import {
  AlertTriangle,
  CheckCircle2,
  DatabaseBackup,
  HardDriveDownload,
  Loader2,
} from "lucide-react"

const LIMIT = 10

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "—"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function basename(key: string): string {
  const parts = key.split("/")
  return parts[parts.length - 1] || key
}

export function BackupManager() {
  const [page, setPage] = React.useState(1)
  const { data: backups, isLoading, isError, refetch } = useBackups()
  const { data: status } = useBackupStatus()
  const run = useRunBackup()

  const last = status?.lastBackup ?? null
  const paged = (backups ?? []).slice((page - 1) * LIMIT, page * LIMIT)
  const totalPages = Math.max(1, Math.ceil((backups?.length ?? 0) / LIMIT))

  const onRun = async () => {
    try {
      const result = await run.mutateAsync()
      if (result.success) {
        toast.success("Backup complete", {
          description: formatBytes(result.sizeBytes),
        })
      } else {
        toast.error("Backup failed", {
          description: result.error || "Unknown error",
        })
      }
    } catch (error) {
      const msgs =
        error instanceof ApiError ? error.messages : ["Couldn't run the backup."]
      msgs.forEach((m) => toast.error(m))
    }
  }

  return (
    <div className="space-y-6">
      {/* Status + action */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 font-heading">
              <DatabaseBackup className="size-5 text-primary" />
              Database backup
            </CardTitle>
            <CardDescription>
              On-demand MongoDB snapshots uploaded to R2. Expired backups are
              pruned automatically by retention policy.
            </CardDescription>
          </div>
          <Button
            onClick={onRun}
            disabled={run.isPending}
            className="gap-1.5"
          >
            {run.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Running…
              </>
            ) : (
              <>
                <HardDriveDownload className="size-4" />
                Run backup now
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <LastBackupStatus last={last} running={run.isPending} />
        </CardContent>
      </Card>

      {/* Backups list */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base">
            Stored backups
          </CardTitle>
          <CardDescription>
            {backups?.length ?? 0} object(s) in R2.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-4">
              <DirectoryError onRetry={refetch} />
            </div>
          ) : paged.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead className="w-32">Size</TableHead>
                  <TableHead className="w-44">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((b: BackupInfo) => {
                  const d = b.lastModified ? parseISO(b.lastModified) : null
                  return (
                    <TableRow key={b.key}>
                      <TableCell className="max-w-xs truncate font-mono text-xs">
                        {basename(b.key)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatBytes(b.size)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {d && isValid(d) ? format(d, "d MMM yyyy, HH:mm") : "—"}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No backups stored yet. Click <strong>Run backup now</strong> to
              create one.
            </p>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination
          page={page}
          meta={{
            total: backups?.length ?? 0,
            page,
            limit: LIMIT,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          }}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

function LastBackupStatus({
  last,
  running,
}: {
  last: { success: boolean; key?: string; sizeBytes?: number; error?: string } | null
  running: boolean
}) {
  if (running) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin text-primary" />
        Backing up the database — this can take a minute…
      </div>
    )
  }
  if (!last) {
    return (
      <p className="text-sm text-muted-foreground">
        No backup has been run in this server session.
      </p>
    )
  }
  if (last.success) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <CheckCircle2 className="size-4 text-success" />
        <span className="font-medium text-foreground">Last backup succeeded</span>
        <Badge variant="secondary">{formatBytes(last.sizeBytes)}</Badge>
        {last.key && (
          <span className="truncate font-mono text-xs text-muted-foreground">
            {basename(last.key)}
          </span>
        )}
      </div>
    )
  }
  return (
    <div className="flex items-start gap-2 text-sm">
      <AlertTriangle className="mt-0.5 size-4 text-destructive" />
      <div>
        <p className="font-medium text-destructive">Last backup failed</p>
        {last.error && (
          <p className="text-xs text-muted-foreground">{last.error}</p>
        )}
      </div>
    </div>
  )
}

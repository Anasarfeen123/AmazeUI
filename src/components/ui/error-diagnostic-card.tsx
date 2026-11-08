"use client"
import { useEffect, useMemo, useState } from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { cn } from "../../lib/utils"

type RuntimeInfo = {
  href: string
  userAgent: string
  language: string
  platform: string
  online: boolean
  referrer: string
  timestamp: string
}

export interface ErrorDiagnosticCardProps {
  title: string
  description: string
  error?: { name?: string; message?: string; digest?: string; stack?: string }
  onRetry?: () => void
  dashboardHref?: string
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

export function ErrorDiagnosticCard({
  title,
  description,
  error,
  onRetry,
  dashboardHref,
}: ErrorDiagnosticCardProps) {
  const [copied, setCopied] = useState(false)
  const [runtimeInfo, setRuntimeInfo] = useState<RuntimeInfo | null>(null)

  useEffect(() => {
    setRuntimeInfo({
      href: window.location.href,
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      online: navigator.onLine,
      referrer: document.referrer || "none",
      timestamp: new Date().toISOString(),
    })
  }, [])

  const report = useMemo(
    () => ({
      title,
      description,
      error: {
        name: error?.name ?? "UnknownError",
        message: error?.message ?? "Unknown client-side exception",
        digest: error?.digest ?? "none",
        stack: error?.stack ?? "stack unavailable",
      },
      runtime: runtimeInfo,
    }),
    [description, error, runtimeInfo, title]
  )

  const copyReport = async () => {
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-ink">
      <div className="w-full max-w-2xl animate-in fade-in duration-300">
        <Card className="relative w-full overflow-hidden">
          <CardHeader className="text-center pt-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-soft text-danger">
                <AlertCircleIcon className="h-7 w-7" />
              </div>
            </div>
            <p className="text-xs text-muted">Something went wrong</p>
            <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight text-ink mt-1 leading-snug">
              {title}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm mt-2 text-muted max-w-md mx-auto leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 md:px-8 pb-8">
            <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-4 pt-2">
              {onRetry ? (
                <Button
                  onClick={onRetry}
                  variant="default"
                  className="rounded-xl font-bold text-xs py-2 min-h-[38px]"
                >
                  Try again
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.reload()}
                  variant="default"
                  className="rounded-xl font-bold text-xs py-2 min-h-[38px]"
                >
                  Reload page
                </Button>
              )}
              {onRetry && (
                <Button
                  onClick={() => window.location.reload()}
                  variant="secondary"
                  className="rounded-xl font-bold text-xs py-2 min-h-[38px]"
                >
                  Reload page
                </Button>
              )}
              {dashboardHref && (
                <a href={dashboardHref}>
                  <Button
                    variant="outline"
                    className="rounded-xl font-bold text-xs py-2 min-h-[38px] w-full"
                  >
                    Dashboard
                  </Button>
                </a>
              )}
              <Button
                onClick={copyReport}
                variant="outline"
                className={cn(
                  "rounded-xl font-bold text-xs py-2 min-h-[38px] transition-colors",
                  copied && "text-ok border-ok/40 bg-ok-soft"
                )}
              >
                {copied ? "Copied Report" : "Copy Report"}
              </Button>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full justify-start bg-slate-100 dark:bg-neutral-900/50 p-1 rounded-xl">
                <TabsTrigger value="summary" className="text-xs font-bold rounded-lg px-4 py-1.5">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="technical" className="text-xs font-bold rounded-lg px-4 py-1.5">
                  Technical Report
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4 focus-visible:outline-none">
                <div className="grid gap-3 rounded-md border border-line bg-surface-2 p-4 text-xs font-semibold text-ink-2 leading-relaxed">
                  <p className="flex justify-between border-b border-slate-100 dark:border-neutral-900/50 pb-2">
                    <span className="text-muted font-bold text-[11px]">Error Message</span>
                    <span className="truncate max-w-[70%] font-semibold text-ink">
                      {error?.message ?? "Unknown client-side exception"}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-slate-100 dark:border-neutral-900/50 pb-2">
                    <span className="text-muted font-bold text-[11px]">Digest Hash</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {error?.digest ?? "none"}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-slate-100 dark:border-neutral-900/50 pb-2">
                    <span className="text-muted font-bold text-[11px]">Source Route</span>
                    <span className="truncate max-w-[70%] font-mono text-[11px] text-slate-500">
                      {runtimeInfo?.href ?? "collecting..."}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-slate-100 dark:border-neutral-900/50 pb-2">
                    <span className="text-muted font-bold text-[11px]">Timestamp</span>
                    <span className="font-medium">
                      {runtimeInfo?.timestamp
                        ? new Date(runtimeInfo.timestamp).toLocaleString()
                        : "collecting..."}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted font-bold text-[11px]">Connection Status</span>
                    <span
                      className={runtimeInfo?.online ? "text-ok font-bold" : "text-warn font-bold"}
                    >
                      {runtimeInfo ? (runtimeInfo.online ? "Online" : "Offline") : "collecting..."}
                    </span>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="mt-4 focus-visible:outline-none">
                <pre className="max-h-60 overflow-auto whitespace-pre-wrap rounded-md border border-line bg-surface-2 p-4 text-[11px] font-mono leading-relaxed text-ink-2">
                  {JSON.stringify(report, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

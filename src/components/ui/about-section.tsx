"use client"
import { cn } from "../../lib/utils"

export interface AboutSectionProps {
  wordmarkLightSrc?: string
  wordmarkDarkSrc?: string
  tagline?: string
  className?: string
  version?: string
  buildNumber?: string
  lastUpdated?: string
  platform?: string
  credits?: string
}

export function AboutSection({
  wordmarkLightSrc,
  wordmarkDarkSrc,
  tagline,
  className,
  version,
  buildNumber,
  lastUpdated,
  platform,
  credits = "Made by Amaze Continuity Projects",
}: AboutSectionProps) {
  const showWordmark = wordmarkLightSrc || wordmarkDarkSrc
  const hasInfoGrid = version || buildNumber || lastUpdated || platform

  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-4 bg-transparent p-6 text-center sm:rounded-md sm:border sm:border-line sm:bg-surface",
        className
      )}
    >
      {(showWordmark || tagline) && (
        <div className="space-y-3.5 pt-1.5">
          {wordmarkLightSrc && (
            <img
              src={wordmarkLightSrc}
              alt=""
              className="h-6 object-contain mx-auto block dark:hidden"
            />
          )}
          {wordmarkDarkSrc && (
            <img
              src={wordmarkDarkSrc}
              alt=""
              className="h-6 object-contain mx-auto hidden dark:block"
            />
          )}
          {tagline && <p className="text-xs text-muted">{tagline}</p>}
        </div>
      )}

      {hasInfoGrid && (
        <div className="mt-2 grid w-full max-w-xs grid-cols-2 gap-x-4 gap-y-2.5 border-t border-line-2 pt-2 text-left text-xs">
          {version && (
            <div>
              <span className="block text-muted">Version</span>
              <span className="font-mono font-medium text-ink">{version}</span>
            </div>
          )}
          {buildNumber && (
            <div>
              <span className="block text-muted">Build</span>
              <span className="font-mono font-medium text-ink">{buildNumber}</span>
            </div>
          )}
          {lastUpdated && (
            <div>
              <span className="block text-muted">Last updated</span>
              <span className="font-mono font-medium text-ink">{lastUpdated}</span>
            </div>
          )}
          {platform && (
            <div>
              <span className="block text-muted">Platform</span>
              <span className="font-mono font-medium text-ink">{platform}</span>
            </div>
          )}
        </div>
      )}

      {credits && (
        <p className="w-full border-t border-line-2 pt-2 text-xs text-muted">{credits}</p>
      )}
    </div>
  )
}

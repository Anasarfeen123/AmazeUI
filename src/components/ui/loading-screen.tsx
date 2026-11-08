"use client"
import { cn } from "../../lib/utils"

export interface LoadingScreenProps {
  logoSrc?: string
  wordmarkLightSrc?: string
  wordmarkDarkSrc?: string
  title?: string
  subtitle?: string
  className?: string
  progress?: number
}

export function LoadingScreen({
  logoSrc = "/logo.png",
  wordmarkLightSrc,
  wordmarkDarkSrc,
  title,
  subtitle = "Loading",
  className,
  progress,
}: LoadingScreenProps) {
  const showWordmark = wordmarkLightSrc || wordmarkDarkSrc
  const showText = title

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-background transition-all relative overflow-hidden",
        className
      )}
    >
      <style>{`
        @keyframes loaderBar {
          0% { left: -35%; }
          100% { left: 100%; }
        }
        .animate-loaderBar {
          animation: loaderBar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="flex flex-col items-center space-y-6 max-w-xs text-center z-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-md border border-line bg-surface">
          <img src={logoSrc} alt={title || "Logo"} className="w-14 h-14 object-contain" />
        </div>

        <div className="space-y-3 pt-2.5">
          {showWordmark && (
            <>
              {wordmarkLightSrc && (
                <img
                  src={wordmarkLightSrc}
                  alt={title || ""}
                  className="h-6 object-contain mx-auto block dark:hidden"
                />
              )}
              {wordmarkDarkSrc && (
                <img
                  src={wordmarkDarkSrc}
                  alt={title || ""}
                  className="h-6 object-contain mx-auto hidden dark:block"
                />
              )}
            </>
          )}
          {showText && <p className="text-sm text-muted">{title}</p>}
          {!showWordmark && !showText && subtitle && (
            <p className="text-sm text-muted">{subtitle}</p>
          )}
        </div>

        <div className="relative h-1 w-40 overflow-hidden rounded-full bg-surface-2">
          {progress !== undefined ? (
            <div
              className="absolute bottom-0 left-0 top-0 rounded-full bg-accent transition-[width] duration-200"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          ) : (
            <div className="animate-loaderBar absolute bottom-0 left-0 top-0 w-[35%] rounded-full bg-accent motion-reduce:animate-none" />
          )}
        </div>
      </div>
    </div>
  )
}

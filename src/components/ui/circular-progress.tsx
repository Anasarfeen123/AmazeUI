import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export interface CircularProgressProps {
  value: number
  text?: string
  size?: number
  strokeWidth?: number
  threshold?: number
  midThreshold?: number
  className?: string
}

const defaultThreshold = 75
const defaultMidThreshold = 85

export function CircularProgress({
  value,
  text,
  size = 80,
  strokeWidth = 8,
  threshold = defaultThreshold,
  midThreshold = defaultMidThreshold,
  className,
}: CircularProgressProps) {
  const pathColor =
    value < threshold ? "var(--danger)" : value < midThreshold ? "var(--warn)" : "var(--ok)"

  return (
    <div className={className} style={{ width: size, height: size }}>
      <CircularProgressbar
        value={value}
        text={text ?? `${value}%`}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor,
          textColor: "currentColor",
          trailColor: "var(--surface-2)",
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  )
}

import type { ReactNode } from 'react'
import { useRef, useState, useCallback } from 'react'

const PULL_THRESHOLD = 60

export default function usePullToRefresh(onRefresh: () => void) {
  const [pullDistance, setPullDistance] = useState(0)
  const touchStartY = useRef(0)
  const pulling = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY
      pulling.current = true
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling.current) return
    const dy = e.touches[0].clientY - touchStartY.current
    if (dy > 0) {
      setPullDistance(Math.min(dy * 0.5, PULL_THRESHOLD * 2))
    } else {
      pulling.current = false
      setPullDistance(0)
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!pulling.current) return
    pulling.current = false
    if (pullDistance >= PULL_THRESHOLD) {
      onRefresh()
    }
    setPullDistance(0)
  }, [pullDistance, onRefresh])

  const pullIndicator: ReactNode = (
    <div className="pull-indicator" style={{ height: pullDistance }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={pullDistance >= PULL_THRESHOLD ? 'pull-rotate' : ''}
        style={{ opacity: Math.min(pullDistance / PULL_THRESHOLD, 1) }}
      >
        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </div>
  )

  return {
    scrollRef,
    pullIndicator,
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd },
  }
}
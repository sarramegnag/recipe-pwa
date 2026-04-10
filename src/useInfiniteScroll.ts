import type { RefObject, UIEventHandler } from 'react'
import { useCallback } from 'react'

export default function useInfiniteScroll(
  scrollRef: RefObject<HTMLDivElement | null>,
  onLoadMore: () => void,
  enabled: boolean,
): UIEventHandler<HTMLDivElement> {
  return useCallback(() => {
    const el = scrollRef.current
    if (!el || !enabled) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
      onLoadMore()
    }
  }, [scrollRef, onLoadMore, enabled])
}
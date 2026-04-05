import { useEffect, useRef } from 'react'

export default function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    let released = false

    async function acquire() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen')
        }
      } catch {
        // Wake Lock can fail silently (e.g. low battery, background tab)
      }
    }

    acquire()

    function onVisibilityChange() {
      if (document.visibilityState === 'visible' && !released) {
        acquire()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      released = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      wakeLockRef.current?.release()
    }
  }, [])
}
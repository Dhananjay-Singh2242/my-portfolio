import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Thin bar at the top of the page showing how far you've scrolled. */
export function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="progress" ref={barRef} aria-hidden="true" />
}

/** Floating button that appears after scrolling and jumps back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`totop ${show ? 'is-visible' : ''}`}
      href="#top"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V5m0 0-6 6m6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

const parseCount = (value) => {
  const m = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  return m ? { prefix: m[1], target: Number(m[2]), suffix: m[3] } : null
}

/** Counts a number up (e.g. "~40%", "23") once it scrolls into view. */
export function CountUp({ value, duration = 1200 }) {
  const parsed = parseCount(value)
  const target = parsed ? parsed.target : 0
  const ref = useRef(null)
  const [current, setCurrent] = useState(prefersReducedMotion() ? target : 0)

  useEffect(() => {
    const node = ref.current
    if (!node || !parsed || prefersReducedMotion()) return undefined

    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          setCurrent(Math.round(target * (1 - (1 - t) ** 3)))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  if (!parsed) return <span>{value}</span>
  return (
    <span ref={ref}>
      {parsed.prefix}
      {current}
      {parsed.suffix}
    </span>
  )
}

/** Button that copies text to the clipboard and confirms it. */
export function CopyButton({ text, className = '', children }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" className={className} onClick={copy}>
      <span>{copied ? 'Copied ✓' : children}</span>
      {!copied && (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}

import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Reveals an element once it scrolls into view.
 * Adds `is-visible` to every descendant carrying the `reveal` class so a whole
 * section can stagger its children with `--reveal-delay`.
 */
export function useReveal(target: Ref<HTMLElement | null>, options: { stagger?: number } = {}) {
  const { stagger = 70 } = options
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return

    const items = Array.from(el.querySelectorAll<HTMLElement>('.reveal'))
    items.forEach((item, index) => {
      if (!item.style.getPropertyValue('--reveal-delay')) {
        item.style.setProperty('--reveal-delay', `${index * stagger}ms`)
      }
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((item) => observer?.observe(item))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}

import { computed, ref, watch } from 'vue'
import { messages, type Locale } from '@/data/i18n'

export type { Locale }

const STORAGE_KEY = 'cc-locale'
const locale = ref<Locale>('en')

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'km') return stored
    return window.navigator.language.toLowerCase().startsWith('km') ? 'km' : 'en'
  } catch {
    return 'en'
  }
}

locale.value = readInitialLocale()

function applyLocale(next: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = next
  document.documentElement.dataset.locale = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* storage unavailable — non-critical */
  }
}

applyLocale(locale.value)

watch(locale, applyLocale)

export function useLocale() {
  const other = computed<Locale>(() => (locale.value === 'en' ? 'km' : 'en'))

  function t(key: string): string {
    return messages[locale.value][key] ?? messages.en[key] ?? key
  }

  function setLocale(next: Locale) {
    locale.value = next
  }

  function toggleLocale() {
    locale.value = other.value
  }

  return { locale, other, t, setLocale, toggleLocale }
}

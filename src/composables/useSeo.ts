import { onMounted, watchEffect } from 'vue'
import { useLocale } from '@/composables/useLocale'

const TITLE = 'Chorm Chandouern — Full-Stack Developer'

const DESCRIPTION =
  'Chorm Chandouern is a Full-Stack Developer building modern, scalable web applications with Laravel, Vue 3, React, PostgreSQL, MySQL and REST APIs. Clean architecture, reliable APIs, responsive UI.'

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/** Keeps document title and meta description in sync with the active locale. */
export function useSeo() {
  const { locale } = useLocale()

  function apply() {
    const isKh = locale.value === 'km'

    document.title = isKh
      ? 'ជំរម ជន ឌួន — អ្នកបង្កើតពេញគ្រប់ជែន (Full-Stack Developer)'
      : TITLE

    const description = isKh
      ? 'ជំរម ជន ឌួន ជាអ្នកបង្កើតពេញគ្រប់ជែន ដែលបង្កើតកម្មវិធីគេហទំព័រទំនាក់ដោយទំនើន ដោយប្រើ Laravel, Vue 3, React, PostgreSQL, MySQL និង REST API។'
      : DESCRIPTION

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  }

  watchEffect(apply)
  onMounted(apply)
}

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Github, Linkedin, Menu, X } from 'lucide-vue-next'
import { profile } from '@/data/projects'
import { useLocale, type Locale } from '@/composables/useLocale'

const { t, locale, setLocale, toggleLocale } = useLocale()
const router = useRouter()

interface NavItem {
  id: string
  key: string
}

const navItems: NavItem[] = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'work', key: 'nav.work' },
  { id: 'services', key: 'nav.services' },
  { id: 'contact', key: 'nav.contact' },
]

const open = ref(false)
const condensed = ref(false)
const activeSection = ref('home')

const languages: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'km', label: 'KH' },
]

const localeLabel = computed(() => (locale.value === 'en' ? 'EN' : 'KH'))
const localeName = computed(() => (locale.value === 'en' ? 'English' : 'ភាសាខ្មែរ'))

function close() {
  open.value = false
}

function scrollTo(id: string) {
  close()
  const el = document.getElementById(id)
  if (!el) {
    router.push({ path: '/', hash: id === 'home' ? undefined : `#${id}` })
    return
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Keep the URL shareable without triggering router navigation.
  window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`)
}

function onScroll() {
  condensed.value = window.scrollY > 24

  const offset = window.scrollY + window.innerHeight * 0.35
  let current = 'home'
  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el && el.offsetTop <= offset) current = item.id
  }
  activeSection.value = current
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close()
}

watch(open, (value) => {
  document.documentElement.style.overflow = value ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4 md:px-6 md:pt-5">
    <nav
      class="pill mx-auto w-full max-w-[84rem] justify-between gap-2 border px-2 py-2 transition-all duration-500 sm:gap-3 sm:px-3 sm:py-2.5 md:px-4"
      :class="
        condensed
          ? 'panel-solid shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]'
          : 'border-line bg-ink-950/45 backdrop-blur-xl'
      "
      aria-label="Primary"
    >
      <!-- Brand -->
      <a
        href="#home"
        class="pill shrink-0 px-1.5 text-[0.72rem] font-semibold tracking-[0.16em] text-surface hover:text-aqua-200 sm:px-2 sm:text-[0.78rem] sm:tracking-[0.2em] md:text-[0.82rem]"
        :aria-label="`${profile.name} — ${t('hero.scroll')} top`"
        @click.prevent="scrollTo('home')"
      >
        <span
          class="grid size-6 place-items-center rounded-full border border-line-strong bg-primary/10 font-display text-[0.56rem] tracking-normal text-primary sm:size-7 sm:text-[0.62rem]"
          aria-hidden="true"
        >
          CC
        </span>
        <span class="hidden sm:inline">{{ profile.shortName }}</span>
        <span class="sm:hidden">CHORM</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-0.5 lg:flex">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="pill relative px-4 py-2 text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300"
            :class="
              activeSection === item.id
                ? 'bg-primary/12 text-aqua-100'
                : 'text-muted hover:bg-white/4 hover:text-surface'
            "
            :aria-current="activeSection === item.id ? 'true' : undefined"
            @click.prevent="scrollTo(item.id)"
          >
            {{ t(item.key) }}
          </a>
        </li>
      </ul>

      <!-- Right cluster -->
      <div class="flex shrink-0 items-center gap-1.5">
        <!-- Language switcher -->
        <div
          class="hidden items-center rounded-full border border-line bg-white/2 p-0.5 sm:flex"
          role="group"
          :aria-label="t('nav.language')"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            type="button"
            class="pill px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.12em]"
            :class="
              locale === lang.code
                ? 'bg-primary/16 text-aqua-100'
                : 'text-muted hover:text-surface'
            "
            :aria-pressed="locale === lang.code"
            @click="setLocale(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>

        <a
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          class="pill hidden size-9 border border-line bg-white/2 text-muted hover:border-line-strong hover:bg-primary/10 hover:text-primary sm:grid"
          :aria-label="`GitHub — ${profile.githubHandle}`"
        >
          <Github :size="16" :stroke-width="1.6" aria-hidden="true" />
        </a>
        <a
          :href="profile.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="pill hidden size-9 border border-line bg-white/2 text-muted hover:border-line-strong hover:bg-primary/10 hover:text-primary sm:grid"
          :aria-label="`LinkedIn — ${profile.name}`"
        >
          <Linkedin :size="16" :stroke-width="1.6" aria-hidden="true" />
        </a>

        <!-- Mobile language + menu trigger -->
        <button
          type="button"
          class="pill border border-line bg-white/2 px-3 py-2 text-[0.66rem] font-semibold tracking-[0.12em] text-aqua-100 lg:hidden"
          :aria-label="`${t('nav.language')}: ${localeName}. ${t('common.language')} switch`"
          @click="toggleLocale"
        >
          {{ localeLabel }}
        </button>
        <button
          type="button"
          class="pill size-9 border border-line bg-white/2 text-surface hover:border-line-strong hover:text-primary lg:hidden"
          :aria-label="open ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <X v-if="open" :size="17" :stroke-width="1.7" aria-hidden="true" />
          <Menu v-else :size="17" :stroke-width="1.7" aria-hidden="true" />
        </button>
      </div>
    </nav>

      <!-- Mobile drawer -->
      <Transition
        enter-active-class="transition duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 -translate-y-3"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="open"
          id="mobile-nav"
          class="panel-solid mx-auto mt-1.5 w-full max-w-[84rem] overflow-hidden rounded-[1.5rem] p-1.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] sm:mt-2 sm:rounded-[1.75rem] sm:p-2 lg:hidden"
        >
        <ul class="flex flex-col">
          <li v-for="(item, index) in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[0.95rem] font-medium tracking-wide transition-colors duration-300"
              :class="
                activeSection === item.id
                  ? 'bg-primary/12 text-aqua-100'
                  : 'text-muted hover:bg-white/4 hover:text-surface'
              "
              :style="{ animation: `fade-rise 0.5s var(--ease-out-expo) ${index * 55}ms both` }"
              @click.prevent="scrollTo(item.id)"
            >
              {{ t(item.key) }}
              <span class="text-[0.65rem] tracking-[0.2em] text-primary/60" aria-hidden="true">
                0{{ index + 1 }}
              </span>
            </a>
          </li>
        </ul>

        <div class="mt-2 flex items-center gap-2 border-t border-line px-2 pt-3 pb-1">
          <a
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="pill flex-1 border border-line bg-white/2 px-4 py-3 text-[0.7rem] font-semibold tracking-[0.18em] text-muted hover:border-line-strong hover:text-primary"
          >
            <Github :size="15" :stroke-width="1.7" aria-hidden="true" />
            GITHUB
          </a>
          <a
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="pill flex-1 border border-line bg-white/2 px-4 py-3 text-[0.7rem] font-semibold tracking-[0.18em] text-muted hover:border-line-strong hover:text-primary"
          >
            <Linkedin :size="15" :stroke-width="1.7" aria-hidden="true" />
            LINKEDIN
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

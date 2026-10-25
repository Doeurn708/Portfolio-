<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUp, Github, Linkedin, Mail, Send } from 'lucide-vue-next'
import { profile } from '@/data/projects'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const year = new Date().getFullYear()

const links = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'Telegram', href: profile.telegram, icon: Send },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
]

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer ref="root" class="relative border-t border-line bg-ink-950/60">
    <div class="container-x py-14 sm:py-16">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <!-- Identity -->
        <div class="reveal">
          <p class="font-display text-[1.15rem] font-semibold tracking-[0.02em] text-surface">
            {{ profile.shortName }}
          </p>
          <p class="mt-2 text-[0.82rem] text-muted">{{ t('footer.tagline') }}</p>
          <p class="mt-6 flex items-center gap-2.5 text-[0.74rem] text-muted-dim">
            <span class="animate-pulse-dot size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {{ t('hero.available') }}
          </p>
        </div>

        <!-- Links -->
        <nav class="reveal" :style="{ '--reveal-delay': '120ms' }" aria-label="Footer">
          <ul class="flex flex-wrap gap-2">
            <li v-for="link in links" :key="link.label">
              <a
                :href="link.href"
                :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
                rel="noopener noreferrer"
                class="pill group border border-line bg-white/[0.02] px-3 py-2 text-[0.64rem] font-semibold tracking-[0.12em] text-muted uppercase hover:border-line-strong hover:bg-primary/8 hover:text-primary sm:px-4 sm:py-2.5 sm:text-[0.7rem] sm:tracking-[0.14em]"
              >
                <component
                  :is="link.icon"
                  :size="13"
                  :stroke-width="1.8"
                  aria-hidden="true"
                />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Back to top -->
        <button
          type="button"
          class="reveal pill group size-11 shrink-0 border border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-primary"
          :style="{ '--reveal-delay': '220ms' }"
          :aria-label="t('footer.backToTop')"
          @click="backToTop"
        >
          <ArrowUp
            :size="16"
            :stroke-width="1.8"
            class="transition-transform duration-400 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Base line -->
      <div
        class="mt-12 flex flex-col gap-3 border-t border-line-soft pt-7 text-[0.74rem] text-muted-dim sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ profile.name }}. {{ t('footer.rights') }}</p>
        <p>{{ t('footer.builtWith') }}</p>
      </div>
    </div>
  </footer>
</template>

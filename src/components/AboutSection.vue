<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, Braces, Cloud, Database, Github, Monitor, Server, Wrench } from 'lucide-vue-next'
import { stats } from '@/data/services'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const iconMap = {
  monitor: Monitor,
  server: Server,
  database: Database,
  braces: Braces,
  wrench: Wrench,
  cloud: Cloud,
} as const

const stacks = computed(() => [
  { icon: 'monitor' as const, label: t('about.frontend'), items: ['Vue 3', 'React', 'Tailwind CSS', 'Bootstrap'] },
  { icon: 'server' as const, label: t('about.backend'), items: ['Laravel', 'PHP', 'Java', 'Spring Boot'] },
  { icon: 'database' as const, label: t('about.database'), items: ['PostgreSQL', 'MySQL'] },
  { icon: 'braces' as const, label: t('about.api'), items: ['REST API', 'Laravel Sanctum', 'Authentication'] },
  { icon: 'wrench' as const, label: t('about.tools'), items: ['Git', 'GitHub', 'Postman', 'VS Code'] },
  { icon: 'cloud' as const, label: t('about.cloud'), items: ['Cloudinary', 'Cloud deployment'] },
])

const pillars = computed(() => [
  { title: t('about.pillar1'), text: t('about.pillar1Text') },
  { title: t('about.pillar2'), text: t('about.pillar2Text') },
  { title: t('about.pillar3'), text: t('about.pillar3Text') },
])

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const statLabelKeys: Record<string, string> = {
  'Public repositories': 'repositories',
  'Featured projects': 'projects',
  'Languages shipped': 'languages',
  'Technology areas': 'areas',
}
</script>

<template>
  <section
    id="about"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="about-title"
  >
    <div class="container-x">
      <SectionHeading
        id="about-title"
        :eyebrow="t('about.eyebrow')"
        :title="t('about.title')"
        :accent="t('about.titleAccent')"
      />

      <div class="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <!-- Narrative + pillars -->
        <div class="reveal flex flex-col gap-8">
          <p class="text-[1rem] leading-[1.8] text-muted sm:text-[1.08rem]">
            {{ t('about.body1') }}
          </p>
          <p class="text-[0.95rem] leading-[1.8] text-muted/85">
            {{ t('about.body2') }}
          </p>

          <div class="mt-2">
            <p
              class="mb-5 text-[0.66rem] font-semibold tracking-[0.34em] text-primary/80 uppercase"
            >
              {{ t('about.pillars') }}
            </p>
            <ul class="flex flex-col gap-px overflow-hidden rounded-[1.6rem] border border-line bg-line">
              <li
                v-for="(pillar, index) in pillars"
                :key="pillar.title"
                class="group relative bg-ink-900/70 p-6 transition-colors duration-500 hover:bg-ink-850/80"
              >
                <div class="flex items-start gap-4">
                  <span
                    class="mt-0.5 font-display text-[0.7rem] tracking-[0.2em] text-primary/70"
                    aria-hidden="true"
                  >
                    0{{ index + 1 }}
                  </span>
                  <div>
                    <h3 class="text-[1.02rem] font-medium text-surface">{{ pillar.title }}</h3>
                    <p class="mt-2 text-[0.88rem] leading-relaxed text-muted/85">
                      {{ pillar.text }}
                    </p>
                  </div>
                </div>
                <span
                  class="absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </li>
            </ul>
          </div>

          <div class="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              class="pill group border border-line bg-white/2 px-6 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] text-surface uppercase hover:border-line-strong hover:bg-primary/8 hover:shadow-glow"
              @click="scrollTo('work')"
            >
              <Github :size="14" :stroke-width="1.8" aria-hidden="true" />
              {{ t('about.ctaGitHub') }}
              <ArrowRight
                :size="14"
                :stroke-width="2"
                class="transition-transform duration-400 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              class="pill border border-line bg-white/2 px-6 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] text-muted uppercase hover:border-line-strong hover:text-aqua-100"
              @click="scrollTo('contact')"
            >
              {{ t('about.ctaContact') }}
            </button>
          </div>
        </div>

        <!-- Capability grid + stats -->
        <div class="flex flex-col gap-5">
          <ul class="grid gap-3 sm:grid-cols-2">
            <li
              v-for="(group, index) in stacks"
              :key="group.label"
              class="reveal group relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-900/55 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:bg-ink-850/70 hover:shadow-glow"
              :style="{ '--reveal-delay': `${index * 70}ms` }"
            >
              <div
                class="absolute -top-14 -right-14 size-32 rounded-full bg-primary/8 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
                aria-hidden="true"
              />
              <div class="relative flex items-center gap-3">
                <span
                  class="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-primary/8 text-primary"
                  aria-hidden="true"
                >
                  <component :is="iconMap[group.icon]" :size="16" :stroke-width="1.7" />
                </span>
                <h3 class="text-[0.82rem] font-semibold tracking-[0.14em] text-surface uppercase">
                  {{ group.label }}
                </h3>
              </div>
              <ul class="relative mt-4 flex flex-wrap gap-1.5">
                <li
                  v-for="item in group.items"
                  :key="item"
                  class="rounded-full border border-line-soft bg-white/2 px-2.5 py-1 text-[0.7rem] text-muted"
                >
                  {{ item }}
                </li>
              </ul>
            </li>
          </ul>

          <ul class="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-4">
            <li
              v-for="stat in stats"
              :key="stat.label"
              class="group bg-ink-900/70 px-4 py-6 text-center transition-colors duration-500 hover:bg-ink-850/80"
            >
              <p class="font-display text-[1.75rem] leading-none font-semibold text-surface">
                {{ stat.value }}
              </p>
              <p class="mt-2 text-[0.64rem] leading-tight tracking-[0.12em] text-muted uppercase">
                {{ t(`stats.${statLabelKeys[stat.label] ?? 'projects'}`) }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

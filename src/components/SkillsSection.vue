<script setup lang="ts">
import { computed, ref } from 'vue'
import { Braces, Cloud, Database, Monitor, Server, Wrench } from 'lucide-vue-next'
import { marqueeSkills, skillGroups } from '@/data/skills'
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

/** Duplicated once so the marquee loops seamlessly. */
const marqueeItems = computed(() => [...marqueeSkills, ...marqueeSkills])
</script>

<template>
  <section
    id="skills"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="skills-title"
  >
    <div class="container-x">
      <SectionHeading
        id="skills-title"
        :eyebrow="t('skills.eyebrow')"
        :title="t('skills.title')"
        :accent="t('skills.titleAccent')"
        :description="t('skills.description')"
      />

      <ul class="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        <li
          v-for="(group, index) in skillGroups"
          :key="group.id"
          class="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-900/50 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow sm:p-7"
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          <!-- Soft group glow -->
          <div
            class="absolute inset-x-0 -top-24 h-48 bg-linear-to-b from-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div class="relative flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <span
                class="grid size-10 shrink-0 place-items-center rounded-2xl border border-line bg-primary/8 text-primary transition-transform duration-500 group-hover:scale-105"
                aria-hidden="true"
              >
                <component :is="iconMap[group.icon]" :size="17" :stroke-width="1.6" />
              </span>
              <h3
                class="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-surface"
              >
                {{ group.label }}
              </h3>
            </div>
            <span
              class="font-display text-[0.68rem] tracking-[0.2em] text-primary/45"
              aria-hidden="true"
            >
              0{{ index + 1 }}
            </span>
          </div>

          <p class="relative mt-4 text-[0.86rem] leading-relaxed text-muted/85">
            {{ group.summary }}
          </p>

          <ul class="relative mt-6 flex flex-wrap gap-2">
            <li v-for="skill in group.skills" :key="skill.name">
              <span
                class="pill group/skill border border-line bg-white/[0.02] px-3.5 py-2 text-[0.78rem] font-medium text-muted transition-all duration-400 hover:-translate-y-0.5 hover:border-line-strong hover:bg-primary/10 hover:text-aqua-100 hover:shadow-[0_0_24px_-6px_rgba(0,229,212,0.55)]"
                :title="skill.note"
              >
                <span
                  v-if="skill.verified"
                  class="size-1.5 shrink-0 rounded-full bg-primary"
                  :aria-label="t('skills.verified')"
                  role="img"
                />
                {{ skill.name }}
              </span>
            </li>
          </ul>
        </li>
      </ul>

      <p
        class="reveal mt-8 flex items-center gap-2.5 text-[0.76rem] text-muted-dim"
        :style="{ '--reveal-delay': '200ms' }"
      >
        <span class="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        {{ t('skills.verifiedNote') }}
      </p>
    </div>

    <!-- Infinite marquee -->
    <div
      class="mask-fade-x mt-16 overflow-hidden border-y border-line-soft py-5 sm:mt-20"
      aria-hidden="true"
    >
      <div class="animate-marquee flex w-max gap-3">
        <span
          v-for="(item, index) in marqueeItems"
          :key="`${item}-${index}`"
          class="shrink-0 rounded-full border border-line bg-white/[0.02] px-5 py-2 font-display text-[0.82rem] tracking-[0.02em] whitespace-nowrap text-muted"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>

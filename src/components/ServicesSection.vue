<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Database, Layers, Monitor, Server } from 'lucide-vue-next'
import { services } from '@/data/services'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const iconMap = {
  monitor: Monitor,
  server: Server,
  layers: Layers,
  database: Database,
} as const

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    id="services"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="services-title"
  >
    <div class="container-x">
      <SectionHeading
        id="services-title"
        :eyebrow="t('services.eyebrow')"
        :title="t('services.title')"
        :accent="t('services.titleAccent')"
        :description="t('services.description')"
      />

      <ul class="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
        <li
          v-for="(service, index) in services"
          :key="service.number"
          class="reveal group relative flex flex-col overflow-hidden rounded-[1.85rem] border border-line bg-ink-900/50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow sm:p-9"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <!-- Giant ghost number -->
          <span
            class="pointer-events-none absolute -right-3 -bottom-8 font-display text-[7rem] leading-none font-bold text-transparent select-none transition-transform duration-700 group-hover:-translate-y-2 sm:text-[9rem]"
            :style="{ WebkitTextStroke: '1px rgba(0,229,212,0.16)' }"
            aria-hidden="true"
          >
            {{ service.number }}
          </span>

          <div
            class="absolute -top-20 -left-16 size-52 rounded-full bg-primary/8 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div class="relative flex items-start justify-between gap-4">
            <span
              class="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-primary/8 text-primary transition-transform duration-500 group-hover:scale-105"
              aria-hidden="true"
            >
              <component :is="iconMap[service.icon]" :size="18" :stroke-width="1.6" />
            </span>
            <span
              class="font-display text-[0.72rem] tracking-[0.24em] text-primary/70"
              aria-hidden="true"
            >
              {{ service.number }}
            </span>
          </div>

          <h3 class="relative mt-7 text-[1.25rem] font-semibold text-surface sm:text-[1.4rem]">
            {{ service.title }}
          </h3>
          <p class="relative mt-3 max-w-sm text-[0.9rem] leading-relaxed text-muted/85">
            {{ service.description }}
          </p>

          <ul class="relative mt-6 flex flex-wrap gap-2">
            <li
              v-for="point in service.points"
              :key="point"
              class="rounded-full border border-line-soft bg-white/[0.02] px-3 py-1.5 text-[0.72rem] text-muted transition-colors duration-400 group-hover:border-line group-hover:text-aqua-100"
            >
              {{ point }}
            </li>
          </ul>
        </li>
      </ul>

      <div class="reveal mt-12 flex justify-center">
        <button
          type="button"
          class="pill group border border-primary bg-primary px-7 py-4 text-[0.72rem] font-semibold tracking-[0.18em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_26px_70px_-24px_rgba(0,229,212,0.7)]"
          @click="scrollToContact"
        >
          {{ t('services.cta') }}
          <ArrowRight
            :size="15"
            :stroke-width="2"
            class="transition-transform duration-400 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </section>
</template>

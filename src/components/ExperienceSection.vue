<script setup lang="ts">
import { ref } from 'vue'
import { journey } from '@/data/services'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section
    id="journey"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="journey-title"
  >
    <div class="container-x">
      <SectionHeading
        id="journey-title"
        :eyebrow="t('journey.eyebrow')"
        :title="t('journey.title')"
        :accent="t('journey.titleAccent')"
        :description="t('journey.description')"
      />

      <!-- Timeline -->
      <ol class="relative mt-14 lg:mt-20">
        <!-- Spine -->
        <span
          class="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-linear-to-b from-primary/60 via-primary/25 to-transparent lg:left-1/2 lg:-translate-x-px"
          aria-hidden="true"
        />

        <li
          v-for="(step, index) in journey"
          :key="step.stage"
          class="reveal relative pb-9 pl-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-14 lg:pb-11 lg:pl-0"
          :style="{ '--reveal-delay': `${Math.min(index, 6) * 80}ms` }"
        >
          <!-- Node -->
          <span
            class="absolute top-1.5 left-0 grid size-6 place-items-center rounded-full border border-line-strong bg-ink-950 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <span
              class="size-2 rounded-full bg-primary transition-transform duration-500 group-hover:scale-125"
            />
          </span>

          <!-- Card -->
          <div
            class="group rounded-[1.5rem] border border-line bg-ink-900/50 p-6 transition-all duration-500 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow"
            :class="index % 2 === 0 ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2'"
          >
            <div
              class="flex flex-wrap items-center gap-x-3 gap-y-2"
              :class="index % 2 === 0 ? 'lg:justify-end' : ''"
            >
              <span
                class="shrink-0 rounded-full border border-line bg-white/[0.02] px-3 py-1 text-[0.62rem] tracking-[0.18em] text-muted-dim uppercase"
              >
                {{ step.period }}
              </span>
              <span
                v-if="step.evidence"
                class="inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/35 bg-primary/8 px-3 py-1 text-[0.62rem] leading-snug tracking-[0.06em] text-aqua-200"
              >
                <span class="shrink-0 font-medium text-primary">{{ t('journey.evidence') }}:</span>
                <span class="break-all">{{ step.evidence }}</span>
              </span>
            </div>

            <h3 class="mt-4 text-[1.08rem] font-semibold text-surface sm:text-[1.18rem]">
              {{ step.stage }}
            </h3>
            <p class="mt-1.5 text-[0.84rem] text-primary/80">{{ step.summary }}</p>
            <p class="mt-3 text-[0.87rem] leading-relaxed text-muted/85">{{ step.detail }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Github } from 'lucide-vue-next'
import type { EnrichedProject } from '@/composables/useGithubRepos'
import { useLocale } from '@/composables/useLocale'

const props = withDefaults(
  defineProps<{
    project: EnrichedProject
    variant?: 'featured' | 'grid'
    index?: number
  }>(),
  { variant: 'grid', index: 0 },
)

const emit = defineEmits<{ open: [project: EnrichedProject] }>()

const { t } = useLocale()

const repoUrl = computed(() => props.project.meta?.url ?? `https://github.com/Doeurn708/${props.project.repo}`)
const demoUrl = computed(() => props.project.liveUrl)
const isFeatured = computed(() => props.variant === 'featured')

/** Deterministic hue from the repo name — purely decorative identity per card. */
const hue = computed(() => {
  let hash = 0
  for (let i = 0; i < props.project.repo.length; i += 1) {
    hash = (hash * 31 + props.project.repo.charCodeAt(i)) % 360
  }
  return hash
})

const tags = computed(() => props.project.stack.slice(0, isFeatured.value ? 6 : 5))
const extraTags = computed(() => Math.max(0, props.project.stack.length - tags.value.length))

function formatDate(value: string): string {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
</script>

<template>
  <article
    class="reveal group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-line bg-ink-900/55 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow"
    :class="isFeatured ? 'lg:flex-row lg:items-stretch' : ''"
    :style="{ '--reveal-delay': `${index * 90}ms` }"
  >
    <!-- Ambient per-card glow -->
    <div
      class="pointer-events-none absolute -top-28 -right-20 size-72 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(circle, hsla(${(hue + 160) % 360} 70% 45% / 0.35), transparent 70%)`,
      }"
      aria-hidden="true"
    />

    <!-- ============ Visual panel ============ -->
    <div
      class="relative flex shrink-0 flex-col justify-between overflow-hidden border-line bg-ink-950/70"
      :class="
        isFeatured
          ? 'lg:w-[46%] lg:border-r lg:p-8 p-6 min-h-56'
          : 'min-h-44 border-b p-6'
      "
    >
      <!-- Layered tech mesh -->
      <div class="grain absolute inset-0" aria-hidden="true">
        <div
          class="absolute inset-0"
          :style="{
            backgroundImage: `
              linear-gradient(to right, rgba(0,229,212,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,229,212,0.07) 1px, transparent 1px)`,
            backgroundSize: '34px 34px',
          }"
        />
        <div
          class="absolute -top-16 -left-10 size-56 rounded-full blur-[60px]"
          :style="{ background: `hsla(${(hue + 160) % 360} 72% 46% / 0.28)` }"
        />
        <div class="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_20%,transparent,rgba(2,7,7,0.86))]" />
      </div>

      <!-- Category + featured badge -->
      <div class="relative flex items-center justify-between gap-3">
        <span
          class="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-primary uppercase"
        >
          {{ project.category }}
        </span>
        <span
          v-if="project.featured"
          class="pill border border-primary/45 bg-primary/12 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.2em] text-aqua-100 uppercase"
        >
          <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {{ t('work.featured') }}
        </span>
      </div>

      <!-- Monogram + repo meta -->
      <div class="relative mt-auto pt-8">
        <p
          class="font-display leading-none font-bold tracking-[-0.04em] text-transparent"
          :class="isFeatured ? 'text-[3.2rem]' : 'text-[2.4rem]'"
          :style="{
            WebkitTextStroke: '1px rgba(0,229,212,0.42)',
          }"
          aria-hidden="true"
        >
          {{ project.repo.slice(0, 2).toUpperCase() }}
        </p>
        <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] text-muted-dim">
          <span>{{ t('work.language') }}: {{ project.language }}</span>
          <span class="size-0.5 rounded-full bg-muted-dim" aria-hidden="true" />
          <span>{{ t('work.updated') }} {{ formatDate(project.updated) }}</span>
        </div>
      </div>
    </div>

    <!-- ============ Content panel ============ -->
    <div class="relative flex flex-1 flex-col p-6 sm:p-7">
      <h3 class="font-display leading-snug font-semibold">
        <button
          type="button"
          class="text-left text-surface transition-colors duration-400 after:absolute after:inset-0 after:content-[''] hover:text-aqua-100"
          :class="isFeatured ? 'text-[1.3rem] sm:text-[1.55rem]' : 'text-[1.15rem] sm:text-[1.3rem]'"
          @click="emit('open', project)"
        >
          {{ project.title }}
        </button>
      </h3>

      <p
        class="mt-3 text-[0.88rem] leading-relaxed text-muted/85"
        :class="isFeatured ? 'sm:text-[0.94rem]' : 'line-clamp-3'"
      >
        {{ project.tagline }}
      </p>

      <!-- Tech tags -->
      <ul class="mt-5 flex flex-wrap gap-1.5">
        <li v-for="tag in tags" :key="tag">
          <span
            class="rounded-full border border-line-soft bg-white/[0.02] px-2.5 py-1 text-[0.68rem] text-muted transition-colors duration-400 group-hover:border-line group-hover:text-aqua-100"
          >
            {{ tag }}
          </span>
        </li>
        <li v-if="extraTags > 0">
          <span class="rounded-full border border-line-soft px-2.5 py-1 text-[0.68rem] text-muted-dim">
            +{{ extraTags }}
          </span>
        </li>
      </ul>

      <!-- Actions (raised above the title's click overlay) -->
      <div class="relative z-10 mt-auto flex flex-wrap items-center gap-2.5 pt-7">
        <button
          type="button"
          class="pill group/btn border border-line bg-white/[0.02] px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] text-surface uppercase hover:border-primary/60 hover:bg-primary/10 hover:text-aqua-100"
          @click="emit('open', project)"
        >
          {{ t('work.viewProject') }}
          <ArrowUpRight
            :size="13"
            :stroke-width="2"
            class="transition-transform duration-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <a
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="pill border border-line bg-white/[0.02] px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-primary"
          :aria-label="`${t('work.viewRepo')}: ${project.repo} on GitHub`"
        >
          <Github :size="13" :stroke-width="1.8" aria-hidden="true" />
          GitHub
        </a>

        <a
          v-if="demoUrl"
          :href="demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="pill border border-line bg-white/[0.02] px-4 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-primary"
        >
          {{ t('work.liveDemo') }}
        </a>
        <span
          v-else
          class="text-[0.66rem] tracking-[0.1em] text-muted-dim/70"
          :title="t('work.noDemo')"
        >
          {{ t('work.noDemo') }}
        </span>
      </div>
    </div>
  </article>
</template>

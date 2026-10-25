<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-vue-next'
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
    class="reveal group relative flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-ink-900/55 transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow sm:rounded-[1.85rem]"
    :class="isFeatured ? 'sm:flex-row sm:items-stretch' : ''"
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
      class="relative flex w-full shrink-0 flex-col justify-between overflow-hidden border-line bg-ink-950/70"
      :class="
        isFeatured
          ? 'sm:w-[48%] sm:border-b-0 sm:border-r sm:p-6 md:w-[46%] md:p-7 lg:p-8 p-4 xs:p-5 min-h-44 sm:min-h-48 md:min-h-52 lg:min-h-56'
          : 'min-h-36 sm:min-h-40 md:min-h-44 border-b p-4 xs:p-5 sm:p-6'
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
          :class="isFeatured ? 'text-[2.6rem] sm:text-[3rem] lg:text-[3.2rem]' : 'text-[2rem] sm:text-[2.4rem]'"
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
    <div class="relative flex min-w-0 flex-1 flex-col p-4 xs:p-5 sm:p-6 lg:p-7">
      <h3 class="font-display leading-snug font-semibold">
        <RouterLink
          :to="{ name: 'project-detail', params: { repo: project.repo } }"
          class="text-left text-surface transition-colors duration-400 after:absolute after:inset-0 after:content-[''] hover:text-aqua-100"
          :class="isFeatured ? 'text-[1.12rem] xs:text-[1.18rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] xl:text-[1.55rem]' : 'text-[1.02rem] xs:text-[1.08rem] sm:text-[1.16rem] md:text-[1.22rem] lg:text-[1.26rem] xl:text-[1.3rem]'"
        >
          {{ project.title }}
        </RouterLink>
      </h3>

      <p
        class="mt-2 text-[0.8rem] leading-relaxed text-muted/85 xs:mt-2.5 sm:mt-3 sm:text-[0.84rem] md:text-[0.88rem]"
        :class="isFeatured ? 'lg:text-[0.9rem] xl:text-[0.94rem]' : 'line-clamp-3'"
      >
        {{ project.tagline }}
      </p>

      <!-- Tech tags -->
      <ul class="mt-4 flex flex-wrap gap-1 sm:mt-5">
        <li v-for="tag in tags" :key="tag">
          <span
            class="rounded-full border border-line-soft bg-white/[0.02] px-2 py-0.5 text-[0.62rem] text-muted transition-colors duration-400 group-hover:border-line group-hover:text-aqua-100 sm:px-2.5 sm:py-1 sm:text-[0.68rem]"
          >
            {{ tag }}
          </span>
        </li>
        <li v-if="extraTags > 0">
          <span class="rounded-full border border-line-soft px-2 py-0.5 text-[0.62rem] text-muted-dim sm:px-2.5 sm:py-1 sm:text-[0.68rem]">
            +{{ extraTags }}
          </span>
        </li>
      </ul>

      <!-- Actions (raised above the title's click overlay) -->
      <div class="relative z-10 mt-auto flex flex-wrap items-center gap-1 pt-4 xs:gap-1.5 xs:pt-5 sm:gap-2 sm:pt-6 md:gap-2.5 md:pt-7">
        <RouterLink
          :to="{ name: 'project-detail', params: { repo: project.repo } }"
          class="pill group/btn border border-line bg-white/[0.02] px-2.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] text-surface uppercase hover:border-primary/60 hover:bg-primary/10 hover:text-aqua-100 xs:px-3 xs:py-2 xs:text-[0.58rem] xs:tracking-[0.12em] sm:px-4 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.14em] md:text-[0.68rem]"
        >
          {{ t('work.viewProject') }}
          <ArrowUpRight
            :size="11"
            :stroke-width="2"
            class="transition-transform duration-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 xs:size-[12px] sm:size-[13px]"
            aria-hidden="true"
          />
        </RouterLink>

        <a
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="pill border border-line bg-white/[0.02] px-2.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] text-muted uppercase hover:border-line-strong hover:text-primary xs:px-3 xs:py-2 xs:text-[0.58rem] xs:tracking-[0.12em] sm:px-4 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.14em] md:text-[0.68rem]"
          :aria-label="`${t('work.viewRepo')}: ${project.repo} on GitHub`"
        >
          <Github :size="11" :stroke-width="1.8" aria-hidden="true" class="xs:size-[12px] sm:size-[13px]" />
          GitHub
        </a>

        <a
          v-if="demoUrl"
          :href="demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="pill border border-primary/50 bg-primary/10 px-2.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] text-aqua-100 uppercase hover:border-primary hover:bg-primary/20 xs:px-3 xs:py-2 xs:text-[0.58rem] xs:tracking-[0.12em] sm:px-4 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.14em] md:text-[0.68rem]"
          :aria-label="`${t('work.liveDemo')}: ${project.title}`"
        >
          <span class="relative flex size-1.5" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary/70" />
            <span class="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {{ t('work.liveDemo') }}
          <ExternalLink :size="10" :stroke-width="2" aria-hidden="true" class="xs:size-[11px] sm:size-[12px]" />
        </a>
        <span
          v-else
          class="text-[0.54rem] tracking-[0.06em] text-muted-dim/70 xs:text-[0.56rem] xs:tracking-[0.08em] sm:text-[0.6rem] sm:tracking-[0.1em] md:text-[0.66rem]"
        >
          {{ t('work.noDemo') }}
        </span>
      </div>
    </div>
  </article>
</template>

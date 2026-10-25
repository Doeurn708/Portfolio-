<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-vue-next'
import { projects } from '@/data/projects'
import { useGithubRepos } from '@/composables/useGithubRepos'
import { useLocale } from '@/composables/useLocale'

const route = useRoute()
const router = useRouter()
const { t } = useLocale()
const { enrich } = useGithubRepos()

const repoParam = computed(() => String(route.params.repo ?? ''))
const all = computed(() => projects.map(enrich))
const project = computed(() => all.value.find((p) => p.repo === repoParam.value) ?? null)
const index = computed(() =>
  project.value ? all.value.findIndex((p) => p.repo === project.value!.repo) : -1,
)
const hasPrevious = computed(() => index.value > 0)
const hasNext = computed(() => index.value >= 0 && index.value < all.value.length - 1)

const repoUrl = computed(() =>
  project.value?.meta?.url ??
  (project.value ? `https://github.com/Doeurn708/${project.value.repo}` : '#'),
)

const sections = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    { key: 'detail.overview', body: p.overview },
    { key: 'detail.problem', body: p.problem },
    { key: 'detail.solution', body: p.solution },
  ]
})

watchEffect(() => {
  document.title = project.value
    ? `${project.value.title} — Chorm Chandouern`
    : 'Project — Chorm Chandouern'
})

function goBack() {
  router.push({ path: '/', hash: '#work' })
}

function step(delta: number) {
  const next = all.value[index.value + delta]
  if (next) {
    router.push({ name: 'project-detail', params: { repo: next.repo } })
  }
}
</script>

<template>
  <section class="relative pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
    <div class="container-x">
      <!-- Back / prev-next -->
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
        <button
          type="button"
          class="pill border border-line bg-white/2 px-4 py-2.5 text-[0.64rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-surface"
          @click="goBack"
        >
          <ArrowLeft :size="14" :stroke-width="2" aria-hidden="true" />
          {{ t('nav.work') }}
        </button>

        <div v-if="project" class="flex items-center gap-2">
          <button
            type="button"
            class="pill border border-line bg-white/2 px-3 py-2 text-[0.6rem] font-semibold tracking-[0.12em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-40 sm:px-4 sm:py-2.5 sm:text-[0.64rem]"
            :disabled="!hasPrevious"
            @click="step(-1)"
          >
            <ArrowLeft :size="12" :stroke-width="2" aria-hidden="true" />
            {{ t('detail.prev') }}
          </button>
          <button
            type="button"
            class="pill border border-line bg-white/2 px-3 py-2 text-[0.6rem] font-semibold tracking-[0.12em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-40 sm:px-4 sm:py-2.5 sm:text-[0.64rem]"
            :disabled="!hasNext"
            @click="step(1)"
          >
            {{ t('detail.next') }}
            <ArrowRight :size="12" :stroke-width="2" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Not found -->
      <div
        v-if="!project"
        class="panel-solid rounded-[1.5rem] border border-line p-6 text-center sm:rounded-[2rem] sm:p-10"
      >
        <p class="text-[0.92rem] text-muted">Project not found.</p>
        <button
          type="button"
          class="pill mt-5 border border-line bg-white/2 px-4 py-2.5 text-[0.64rem] font-semibold tracking-[0.14em] text-surface uppercase hover:border-line-strong hover:text-primary"
          @click="goBack"
        >
          {{ t('nav.work') }}
        </button>
      </div>

      <!-- Project -->
      <article
        v-else
        class="panel-solid overflow-hidden rounded-[1.5rem] border border-line shadow-card sm:rounded-[2rem]"
      >
        <!-- Header -->
        <header class="grain relative overflow-hidden border-b border-line p-4 sm:p-6 lg:p-8 xl:p-9">
          <div
            class="absolute inset-0 opacity-70"
            style="
              background-image:
                linear-gradient(to right, rgba(0, 229, 212, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 229, 212, 0.08) 1px, transparent 1px);
              background-size: 26px 26px;
            "
            aria-hidden="true"
          />
          <div
            class="absolute -top-24 -right-16 size-56 rounded-full bg-primary/16 blur-[70px] sm:size-64"
            aria-hidden="true"
          />

          <div class="relative">
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span
                class="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.18em] text-primary uppercase sm:px-3 sm:text-[0.62rem] sm:tracking-[0.2em]"
              >
                {{ project.category }}
              </span>
              <span
                v-if="project.featured"
                class="pill border border-primary/45 bg-primary/12 px-2.5 py-1 text-[0.56rem] font-semibold tracking-[0.18em] text-aqua-100 uppercase sm:px-3 sm:text-[0.6rem] sm:tracking-[0.2em]"
              >
                {{ t('work.featured') }}
              </span>
            </div>

            <h1
              class="mt-3 max-w-3xl text-[clamp(1.4rem,6vw,3.2rem)] leading-[1.06] font-semibold text-surface sm:mt-4"
            >
              {{ project.title }}
            </h1>
            <p
              class="mt-2 max-w-2xl text-[0.86rem] leading-relaxed text-muted sm:mt-3 sm:text-[0.92rem] md:text-[0.95rem]"
            >
              {{ project.tagline }}
            </p>

            <div class="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-2.5">
              <a
                :href="repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="pill border border-primary bg-primary px-4 py-2.5 text-[0.62rem] font-semibold tracking-[0.12em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_22px_60px_-22px_rgba(0,229,212,0.65)] sm:px-5 sm:py-3 sm:text-[0.68rem] sm:tracking-[0.14em]"
              >
                <Github :size="13" :stroke-width="1.9" aria-hidden="true" class="sm:size-[14px]" />
                {{ t('detail.openRepo') }}
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="pill border border-line bg-white/2 px-4 py-2.5 text-[0.62rem] font-semibold tracking-[0.12em] text-surface uppercase hover:border-line-strong hover:text-primary sm:px-5 sm:py-3 sm:text-[0.68rem] sm:tracking-[0.14em]"
              >
                {{ t('detail.liveDemo') }}
                <ExternalLink :size="12" :stroke-width="2" aria-hidden="true" class="sm:size-[13px]" />
              </a>
              <span
                v-else
                class="rounded-full border border-line-soft px-3 py-2 text-[0.62rem] text-muted-dim/80 sm:px-3.5 sm:text-[0.66rem]"
              >
                {{ t('work.noDemo') }}
              </span>
            </div>

            <!-- Repo facts -->
            <dl
              class="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-7 sm:grid-cols-4"
            >
              <div class="min-w-0 bg-ink-950/70 px-3 py-2.5 sm:px-4 sm:py-3">
                <dt class="text-[0.56rem] tracking-[0.16em] text-muted-dim uppercase sm:text-[0.6rem] sm:tracking-[0.18em]">
                  {{ t('work.language') }}
                </dt>
                <dd class="mt-1 truncate text-[0.78rem] text-surface sm:text-[0.82rem]">
                  {{ project.language }}
                </dd>
              </div>
              <div class="min-w-0 bg-ink-950/70 px-3 py-2.5 sm:px-4 sm:py-3">
                <dt class="text-[0.56rem] tracking-[0.16em] text-muted-dim uppercase sm:text-[0.6rem] sm:tracking-[0.18em]">
                  {{ t('work.updated') }}
                </dt>
                <dd class="mt-1 truncate text-[0.78rem] text-surface sm:text-[0.82rem]">
                  {{ project.updated }}
                </dd>
              </div>
              <div class="min-w-0 bg-ink-950/70 px-3 py-2.5 sm:px-4 sm:py-3">
                <dt class="text-[0.56rem] tracking-[0.16em] text-muted-dim uppercase sm:text-[0.6rem] sm:tracking-[0.18em]">
                  Stars
                </dt>
                <dd class="mt-1 text-[0.78rem] text-surface sm:text-[0.82rem]">
                  {{ project.meta ? project.meta.stars : '—' }}
                </dd>
              </div>
              <div class="min-w-0 bg-ink-950/70 px-3 py-2.5 sm:px-4 sm:py-3">
                <dt class="text-[0.56rem] tracking-[0.16em] text-muted-dim uppercase sm:text-[0.6rem] sm:tracking-[0.18em]">
                  {{ t('work.repo') }}
                </dt>
                <dd class="mt-1 truncate font-mono text-[0.72rem] text-surface sm:text-[0.76rem]">
                  {{ project.repo }}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <!-- Narrative + features -->
        <div class="grid gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8 xl:gap-10 xl:p-9">
          <div class="flex min-w-0 flex-col gap-5 sm:gap-6">
            <section v-for="section in sections" :key="section.key">
              <h2
                class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
              >
                <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                {{ t(section.key) }}
              </h2>
              <p class="mt-2 text-[0.86rem] leading-[1.75] text-muted/90 sm:mt-3 sm:text-[0.9rem] sm:leading-[1.8]">
                {{ section.body }}
              </p>
            </section>
          </div>

          <div class="flex min-w-0 flex-col gap-6 sm:gap-7 lg:gap-8">
            <section>
              <h2
                class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
              >
                <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                {{ t('detail.features') }}
              </h2>
              <ul class="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2">
                <li
                  v-for="feature in project.features"
                  :key="feature.label"
                  class="flex items-start gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <div class="min-w-0">
                    <p class="text-[0.82rem] text-surface sm:text-[0.86rem]">{{ feature.label }}</p>
                    <p
                      v-if="feature.detail"
                      class="mt-0.5 font-mono text-[0.66rem] leading-relaxed break-words text-muted-dim sm:text-[0.68rem]"
                    >
                      {{ feature.detail }}
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2
                class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
              >
                <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                {{ t('detail.stack') }}
              </h2>
              <ul class="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                <li
                  v-for="item in project.stack"
                  :key="item"
                  class="pill border border-line bg-white/[0.02] px-2.5 py-1 text-[0.7rem] break-words text-muted sm:px-3.5 sm:py-1.5 sm:text-[0.74rem]"
                >
                  {{ item }}
                </li>
              </ul>
            </section>
          </div>
        </div>

        <!-- Architecture -->
        <section class="border-t border-line p-4 sm:p-6 lg:p-8 xl:p-9">
          <h2
            class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
          >
            <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
            {{ t('detail.architecture') }}
          </h2>
          <ul
            class="mt-3 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-4 sm:grid-cols-2 sm:rounded-2xl"
          >
            <li
              v-for="line in project.architecture"
              :key="line"
              class="bg-ink-950/60 px-3 py-2.5 font-mono text-[0.7rem] leading-relaxed break-words text-muted sm:px-4 sm:py-3 sm:text-[0.74rem]"
            >
              {{ line }}
            </li>
          </ul>
        </section>
      </article>
    </div>
  </section>
</template>

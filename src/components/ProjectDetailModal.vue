<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ArrowUpRight, Check, Github, X } from 'lucide-vue-next'
import type { EnrichedProject } from '@/composables/useGithubRepos'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{
  project: EnrichedProject | null
  hasPrevious: boolean
  hasNext: boolean
}>()

const emit = defineEmits<{
  close: []
  previous: []
  next: []
}>()

const { t } = useLocale()
const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLElement | null>(null)

const repoUrl = computed(
  () => props.project?.meta?.url ?? (props.project ? `https://github.com/Doeurn708/${props.project.repo}` : '#'),
)

const sections = computed(() => {
  const p = props.project
  if (!p) return []
  return [
    { key: 'detail.overview', body: p.overview },
    { key: 'detail.problem', body: p.problem },
    { key: 'detail.solution', body: p.solution },
  ]
})

function onKeydown(event: KeyboardEvent) {
  if (!props.project) return
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key !== 'Tab') return

  // Focus trap
  const root = dialog.value
  if (!root) return
  const focusable = Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null)
  if (focusable.length === 0) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.project,
  async (value) => {
    if (!value) {
      document.documentElement.style.overflow = ''
      return
    }
    document.documentElement.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        class="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto overscroll-contain p-0 sm:items-center sm:p-6"
        role="presentation"
        @keydown="onKeydown"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-ink-950/85 backdrop-blur-md"
          aria-hidden="true"
          @click="emit('close')"
        />

        <!-- Panel -->
        <div
          ref="dialog"
          role="dialog"
          aria-modal="true"
          :aria-label="project.title"
          class="panel-solid relative z-10 w-full max-w-4xl overflow-hidden rounded-t-[1.5rem] border-b-0 shadow-[0_-30px_90px_-40px_rgba(0,0,0,0.95)] sm:rounded-[2rem] sm:border-b"
        >
          <!-- Header visual -->
          <div class="grain relative overflow-hidden border-b border-line p-4 sm:p-6 lg:p-8 xl:p-9">
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

            <button
              ref="closeButton"
              type="button"
              class="pill absolute top-3 right-3 z-20 size-9 border border-line bg-ink-950/70 text-muted backdrop-blur-md hover:border-line-strong hover:text-primary sm:top-4 sm:right-4 sm:size-10"
              :aria-label="t('detail.close')"
              @click="emit('close')"
            >
              <X :size="16" :stroke-width="1.8" aria-hidden="true" class="sm:size-[17px]" />
            </button>

            <div class="relative">
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  class="rounded-full border border-line bg-white/[0.03] px-2 py-0.5 text-[0.54rem] font-semibold tracking-[0.16em] text-primary uppercase sm:px-2.5 sm:py-1 sm:text-[0.58rem] sm:tracking-[0.18em] md:px-3 md:text-[0.62rem] md:tracking-[0.2em]"
                >
                  {{ project.category }}
                </span>
                <span
                  v-if="project.featured"
                  class="pill border border-primary/45 bg-primary/12 px-2 py-0.5 text-[0.52rem] font-semibold tracking-[0.16em] text-aqua-100 uppercase sm:px-2.5 sm:py-1 sm:text-[0.56rem] sm:tracking-[0.18em] md:px-3 md:text-[0.6rem] md:tracking-[0.2em]"
                >
                  {{ t('work.featured') }}
                </span>
              </div>

              <h2
                class="mt-2.5 max-w-2xl text-[clamp(1.25rem,6vw,2.6rem)] leading-[1.08] font-semibold text-surface sm:mt-3 md:mt-4"
              >
                {{ project.title }}
              </h2>

              <p class="mt-2 max-w-2xl text-[0.82rem] leading-relaxed text-muted sm:text-[0.86rem] md:mt-3 md:text-[0.92rem]">
                {{ project.tagline }}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-2 md:mt-6 md:gap-2.5">
                <a
                  :href="repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pill border border-primary bg-primary px-3 py-2 text-[0.58rem] font-semibold tracking-[0.1em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_22px_60px_-22px_rgba(0,229,212,0.65)] sm:px-4 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.12em] md:px-5 md:py-3 md:text-[0.68rem] md:tracking-[0.14em]"
                >
                  <Github :size="12" :stroke-width="1.9" aria-hidden="true" class="sm:size-[13px] md:size-[14px]" />
                  {{ t('detail.openRepo') }}
                </a>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pill border border-line bg-white/2 px-3 py-2 text-[0.58rem] font-semibold tracking-[0.1em] text-surface uppercase hover:border-line-strong hover:text-primary sm:px-4 sm:py-2.5 sm:text-[0.62rem] sm:tracking-[0.12em] md:px-5 md:py-3 md:text-[0.68rem] md:tracking-[0.14em]"
                >
                  {{ t('detail.liveDemo') }}
                  <ArrowUpRight :size="11" :stroke-width="2" aria-hidden="true" class="sm:size-[12px] md:size-[13px]" />
                </a>
                <span
                  v-else
                  class="rounded-full border border-line-soft px-2.5 py-1.5 text-[0.56rem] text-muted-dim/80 sm:px-3 sm:py-2 sm:text-[0.62rem] md:px-3.5 md:text-[0.66rem]"
                >
                  {{ t('work.noDemo') }}
                </span>
              </div>

              <!-- Repo facts -->
              <dl class="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                <div class="bg-ink-950/70 px-4 py-3">
                  <dt class="text-[0.6rem] tracking-[0.18em] text-muted-dim uppercase">
                    {{ t('work.language') }}
                  </dt>
                  <dd class="mt-1 text-[0.82rem] text-surface">{{ project.language }}</dd>
                </div>
                <div class="bg-ink-950/70 px-4 py-3">
                  <dt class="text-[0.6rem] tracking-[0.18em] text-muted-dim uppercase">
                    {{ t('work.updated') }}
                  </dt>
                  <dd class="mt-1 text-[0.82rem] text-surface">{{ project.updated }}</dd>
                </div>
                <div class="bg-ink-950/70 px-4 py-3">
                  <dt class="text-[0.6rem] tracking-[0.18em] text-muted-dim uppercase">Stars</dt>
                  <dd class="mt-1 text-[0.82rem] text-surface">
                    {{ project.meta ? project.meta.stars : '—' }}
                  </dd>
                </div>
                <div class="min-w-0 bg-ink-950/70 px-4 py-3">
                  <dt class="text-[0.6rem] tracking-[0.18em] text-muted-dim uppercase">
                    {{ t('work.repo') }}
                  </dt>
                  <dd class="mt-1 truncate font-mono text-[0.76rem] text-surface">
                    {{ project.repo }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Body -->
          <div class="max-h-[72vh] overflow-y-auto overscroll-contain p-4 sm:max-h-[64vh] sm:p-6 md:p-7 lg:max-h-[min(78vh,900px)] lg:p-8 xl:max-h-none xl:p-9">
            <div class="grid gap-5 sm:gap-6 md:gap-7 lg:grid-cols-2 lg:gap-9 xl:gap-10">
              <!-- Narrative -->
              <div class="flex flex-col gap-5 sm:gap-6">
                <section v-for="section in sections" :key="section.key">
                  <h3
                    class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
                  >
                    <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {{ t(section.key) }}
                  </h3>
                  <p class="mt-2 text-[0.84rem] leading-[1.75] text-muted/90 sm:mt-3 sm:text-[0.88rem] md:text-[0.9rem] md:leading-[1.8]">{{ section.body }}</p>
                </section>
              </div>

              <!-- Features + stack -->
              <div class="flex flex-col gap-6 sm:gap-7 lg:gap-8">
                <section>
                  <h3
                    class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
                  >
                    <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {{ t('detail.features') }}
                  </h3>
                  <ul class="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2">
                    <li
                      v-for="feature in project.features"
                      :key="feature.label"
                      class="flex items-start gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
                    >
                      <Check
                        :size="14"
                        :stroke-width="2"
                        class="mt-0.5 shrink-0 text-primary sm:size-[15px]"
                        aria-hidden="true"
                      />
                      <div class="min-w-0">
                        <p class="text-[0.8rem] text-surface sm:text-[0.84rem] md:text-[0.85rem]">{{ feature.label }}</p>
                        <p
                          v-if="feature.detail"
                          class="mt-0.5 font-mono text-[0.64rem] leading-relaxed break-words text-muted-dim sm:text-[0.66rem] md:text-[0.68rem]"
                        >
                          {{ feature.detail }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3
                    class="flex items-center gap-2.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase"
                  >
                    <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {{ t('detail.stack') }}
                  </h3>
                  <ul class="mt-4 flex flex-wrap gap-2">
                    <li
                      v-for="item in project.stack"
                      :key="item"
                      class="pill border border-line bg-white/[0.02] px-3.5 py-1.5 text-[0.74rem] text-muted"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            <!-- Architecture -->
            <section class="mt-6 sm:mt-7 lg:mt-8">
              <h3
                class="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.24em] text-primary uppercase sm:gap-2.5 sm:text-[0.68rem] sm:tracking-[0.28em]"
              >
                <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                {{ t('detail.architecture') }}
              </h3>
              <ul class="mt-3 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-4 sm:grid-cols-2 sm:rounded-2xl">
                <li
                  v-for="line in project.architecture"
                  :key="line"
                  class="bg-ink-950/60 px-3 py-2.5 font-mono text-[0.68rem] leading-relaxed break-words text-muted sm:px-4 sm:py-3 sm:text-[0.72rem] md:text-[0.74rem]"
                >
                  {{ line }}
                </li>
              </ul>
            </section>
          </div>

          <!-- Footer nav -->
          <div
            class="flex flex-wrap items-center justify-between gap-1.5 border-t border-line px-3 py-2.5 sm:flex-nowrap sm:gap-2 sm:px-5 sm:py-3 md:gap-3 md:px-6 md:py-4 lg:px-8 xl:px-9"
          >
            <button
              type="button"
              class="pill border border-line bg-white/2 px-2.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-35 sm:px-3 sm:py-2 sm:text-[0.6rem] sm:tracking-[0.12em] md:px-4 md:py-2.5 md:text-[0.66rem] md:tracking-[0.14em]"
              :disabled="!hasPrevious"
              @click="emit('previous')"
            >
              ← {{ t('detail.prev') }}
            </button>
            <a
              :href="repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden max-w-[40%] items-center gap-1.5 truncate font-mono text-[0.62rem] text-muted-dim transition-colors hover:text-primary sm:flex sm:gap-2 sm:text-[0.66rem] md:max-w-none md:text-[0.72rem]"
            >
              <span class="truncate">github.com/Doeurn708/{{ project.repo }}</span>
              <ArrowUpRight :size="10" :stroke-width="2" aria-hidden="true" class="shrink-0 sm:size-[11px] md:size-[12px]" />
            </a>
            <button
              type="button"
              class="pill border border-line bg-white/2 px-2.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-35 sm:px-3 sm:py-2 sm:text-[0.6rem] sm:tracking-[0.12em] md:px-4 md:py-2.5 md:text-[0.66rem] md:tracking-[0.14em]"
              :disabled="!hasNext"
              @click="emit('next')"
            >
              {{ t('detail.next') }} →
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

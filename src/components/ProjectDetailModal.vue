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
          class="panel-solid relative z-10 w-full max-w-4xl overflow-hidden rounded-t-[2rem] border-b-0 shadow-[0_-30px_90px_-40px_rgba(0,0,0,0.95)] sm:rounded-[2rem] sm:border-b"
        >
          <!-- Header visual -->
          <div class="grain relative overflow-hidden border-b border-line p-6 sm:p-9">
            <div
              class="absolute inset-0 opacity-70"
              style="
                background-image:
                  linear-gradient(to right, rgba(0, 229, 212, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 229, 212, 0.08) 1px, transparent 1px);
                background-size: 30px 30px;
              "
              aria-hidden="true"
            />
            <div
              class="absolute -top-24 -right-16 size-64 rounded-full bg-primary/16 blur-[70px]"
              aria-hidden="true"
            />

            <button
              ref="closeButton"
              type="button"
              class="pill absolute top-4 right-4 z-20 size-10 border border-line bg-ink-950/70 text-muted backdrop-blur-md hover:border-line-strong hover:text-primary"
              :aria-label="t('detail.close')"
              @click="emit('close')"
            >
              <X :size="17" :stroke-width="1.8" aria-hidden="true" />
            </button>

            <div class="relative">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-primary uppercase"
                >
                  {{ project.category }}
                </span>
                <span
                  v-if="project.featured"
                  class="pill border border-primary/45 bg-primary/12 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.2em] text-aqua-100 uppercase"
                >
                  {{ t('work.featured') }}
                </span>
              </div>

              <h2
                class="mt-4 max-w-2xl text-[clamp(1.6rem,4.4vw,2.6rem)] leading-[1.04] font-semibold text-surface"
              >
                {{ project.title }}
              </h2>

              <p class="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
                {{ project.tagline }}
              </p>

              <div class="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  :href="repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pill border border-primary bg-primary px-5 py-3 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_22px_60px_-22px_rgba(0,229,212,0.65)]"
                >
                  <Github :size="14" :stroke-width="1.9" aria-hidden="true" />
                  {{ t('detail.openRepo') }}
                </a>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pill border border-line bg-white/2 px-5 py-3 text-[0.68rem] font-semibold tracking-[0.14em] text-surface uppercase hover:border-line-strong hover:text-primary"
                >
                  {{ t('detail.liveDemo') }}
                  <ArrowUpRight :size="13" :stroke-width="2" aria-hidden="true" />
                </a>
                <span
                  v-else
                  class="rounded-full border border-line-soft px-3.5 py-2 text-[0.66rem] text-muted-dim/80"
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
          <div class="max-h-[58vh] overflow-y-auto overscroll-contain p-6 sm:max-h-none sm:p-9">
            <div class="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <!-- Narrative -->
              <div class="flex flex-col gap-6">
                <section v-for="section in sections" :key="section.key">
                  <h3
                    class="flex items-center gap-2.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase"
                  >
                    <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {{ t(section.key) }}
                  </h3>
                  <p class="mt-3 text-[0.9rem] leading-[1.8] text-muted/90">{{ section.body }}</p>
                </section>
              </div>

              <!-- Features + stack -->
              <div class="flex flex-col gap-8">
                <section>
                  <h3
                    class="flex items-center gap-2.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase"
                  >
                    <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                    {{ t('detail.features') }}
                  </h3>
                  <ul class="mt-4 flex flex-col gap-2">
                    <li
                      v-for="feature in project.features"
                      :key="feature.label"
                      class="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] px-4 py-3"
                    >
                      <Check
                        :size="15"
                        :stroke-width="2"
                        class="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div class="min-w-0">
                        <p class="text-[0.85rem] text-surface">{{ feature.label }}</p>
                        <p
                          v-if="feature.detail"
                          class="mt-0.5 font-mono text-[0.68rem] leading-relaxed break-words text-muted-dim"
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
            <section class="mt-8">
              <h3
                class="flex items-center gap-2.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase"
              >
                <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
                {{ t('detail.architecture') }}
              </h3>
              <ul class="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                <li
                  v-for="line in project.architecture"
                  :key="line"
                  class="bg-ink-950/60 px-4 py-3 font-mono text-[0.74rem] leading-relaxed break-words text-muted"
                >
                  {{ line }}
                </li>
              </ul>
            </section>
          </div>

          <!-- Footer nav -->
          <div
            class="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-9"
          >
            <button
              type="button"
              class="pill border border-line bg-white/2 px-4 py-2.5 text-[0.66rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-35"
              :disabled="!hasPrevious"
              @click="emit('previous')"
            >
              ← {{ t('detail.prev') }}
            </button>
            <a
              :href="repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden items-center gap-2 font-mono text-[0.72rem] text-muted-dim transition-colors hover:text-primary sm:flex"
            >
              github.com/Doeurn708/{{ project.repo }}
              <ArrowUpRight :size="12" :stroke-width="2" aria-hidden="true" />
            </a>
            <button
              type="button"
              class="pill border border-line bg-white/2 px-4 py-2.5 text-[0.66rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-surface disabled:pointer-events-none disabled:opacity-35"
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

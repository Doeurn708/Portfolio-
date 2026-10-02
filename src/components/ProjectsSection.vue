<script setup lang="ts">
import { computed, ref } from 'vue'
import { Github, RefreshCw } from 'lucide-vue-next'
import { profile, projects as curatedProjects } from '@/data/projects'
import { useGithubRepos, type EnrichedProject } from '@/composables/useGithubRepos'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectDetailModal from './ProjectDetailModal.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const { status, enrich } = useGithubRepos()

const all = computed<EnrichedProject[]>(() => curatedProjects.map(enrich))

const featured = computed(() => all.value.find((p) => p.featured) ?? all.value[0]!)
const grid = computed(() => all.value.filter((p) => p.repo !== featured.value.repo))

const active = ref<EnrichedProject | null>(null)
const activeIndex = computed(() =>
  active.value ? all.value.findIndex((p) => p.repo === active.value!.repo) : -1,
)

function openDetail(project: EnrichedProject) {
  active.value = project
}

function closeDetail() {
  active.value = null
}

function step(delta: number) {
  const nextIndex = activeIndex.value + delta
  const next = all.value[nextIndex]
  if (next) active.value = next
}
</script>

<template>
  <section
    id="work"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="work-title"
  >
    <div class="container-x">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-title"
          :eyebrow="t('work.eyebrow')"
          :title="t('work.title')"
          :accent="t('work.titleAccent')"
          :description="t('work.description')"
        />

        <!-- Data provenance -->
        <p
          class="reveal flex shrink-0 items-center gap-2 text-[0.68rem] tracking-[0.12em] text-muted-dim uppercase"
        >
          <RefreshCw
            v-if="status === 'loading'"
            :size="12"
            :stroke-width="1.8"
            class="animate-spin text-primary"
            aria-hidden="true"
          />
          <span
            v-else
            class="size-1.5 rounded-full"
            :class="status === 'live' ? 'bg-primary' : 'bg-muted-dim'"
            aria-hidden="true"
          />
          {{ status === 'loading' ? t('work.loading') : status === 'live' ? t('work.live') : t('work.cached') }}
        </p>
      </div>

      <!-- Featured: large horizontal card -->
      <div class="mt-14 lg:mt-20">
        <ProjectCard :project="featured" variant="featured" :index="0" @open="openDetail" />
      </div>

      <!-- Supporting: 2-column grid -->
      <ul class="mt-4 grid gap-4 md:grid-cols-2">
        <li v-for="(project, index) in grid" :key="project.repo">
          <ProjectCard
            :project="project"
            :index="index + 1"
            @open="openDetail"
          />
        </li>
      </ul>

      <!-- Footer link -->
      <div class="reveal mt-12 flex flex-col items-center gap-4">
        <a
          :href="profile.github + '?tab=repositories'"
          target="_blank"
          rel="noopener noreferrer"
          class="pill group border border-line bg-white/2 px-7 py-4 text-[0.72rem] font-semibold tracking-[0.18em] text-surface uppercase hover:border-line-strong hover:bg-primary/8 hover:shadow-glow"
        >
          <Github :size="15" :stroke-width="1.8" aria-hidden="true" />
          {{ t('work.allProjects') }}
          <span
            class="transition-transform duration-400 group-hover:translate-x-1"
            aria-hidden="true"
            >→</span
          >
        </a>
        <p class="text-[0.72rem] text-muted-dim">
          {{ t('work.githubProfile') }} ·
          <span class="font-mono">github.com/{{ profile.githubHandle }}</span>
        </p>
      </div>
    </div>

    <!-- Detail modal -->
    <ProjectDetailModal
      :project="active"
      :has-previous="activeIndex > 0"
      :has-next="activeIndex > -1 && activeIndex < all.length - 1"
      @close="closeDetail"
      @previous="step(-1)"
      @next="step(1)"
    />
  </section>
</template>

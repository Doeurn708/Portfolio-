<script setup lang="ts">
import { computed, ref } from 'vue'
import { Github, RefreshCw } from 'lucide-vue-next'
import { profile, projects as curatedProjects } from '@/data/projects'
import { useGithubRepos, type EnrichedProject } from '@/composables/useGithubRepos'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

const { status, enrich } = useGithubRepos()

const all = computed<EnrichedProject[]>(() => curatedProjects.map(enrich))

const featured = computed(() => all.value.find((p) => p.featured) ?? all.value[0]!)
const grid = computed(() => all.value.filter((p) => p.repo !== featured.value.repo))
</script>

<template>
  <section
    id="work"
    ref="root"
    class="relative scroll-mt-20 py-12 sm:scroll-mt-24 sm:py-16 md:scroll-mt-28 md:py-20 lg:py-28 xl:py-36 2xl:py-40"
    aria-labelledby="work-title"
  >
    <div class="container-x">
      <div class="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <SectionHeading
          id="work-title"
          :eyebrow="t('work.eyebrow')"
          :title="t('work.title')"
          :accent="t('work.titleAccent')"
          :description="t('work.description')"
        />

        <!-- Data provenance -->
        <p
          class="reveal flex shrink-0 items-center gap-2 text-[0.62rem] tracking-[0.1em] text-muted-dim uppercase sm:text-[0.66rem] sm:tracking-[0.12em]"
        >
          <RefreshCw
            v-if="status === 'loading'"
            :size="11"
            :stroke-width="1.8"
            class="animate-spin text-primary sm:size-[12px]"
            aria-hidden="true"
          />
          <span
            v-else
            class="size-1 rounded-full sm:size-1.5"
            :class="status === 'live' ? 'bg-primary' : 'bg-muted-dim'"
            aria-hidden="true"
          />
          {{ status === 'loading' ? t('work.loading') : status === 'live' ? t('work.live') : t('work.cached') }}
        </p>
      </div>

      <!-- Featured: large horizontal card -->
      <div class="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20">
        <ProjectCard :project="featured" variant="featured" :index="0" />
      </div>

      <!-- Supporting: grid -->
      <ul class="mt-2.5 grid grid-cols-1 gap-2.5 xs:mt-3 xs:gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <li v-for="(project, index) in grid" :key="project.repo">
          <ProjectCard :project="project" :index="index + 1" />
        </li>
      </ul>
    </div>

    <!-- Footer link -->
    <div class="container-x">
      <div class="reveal mt-10 flex flex-col items-center gap-4 sm:mt-12">
        <a
          :href="profile.github + '?tab=repositories'"
          target="_blank"
          rel="noopener noreferrer"
          class="pill group border border-line bg-white/2 px-5 py-3 text-[0.66rem] font-semibold tracking-[0.14em] text-surface uppercase hover:border-line-strong hover:bg-primary/8 hover:shadow-glow sm:px-7 sm:py-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
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

  </section>
</template>

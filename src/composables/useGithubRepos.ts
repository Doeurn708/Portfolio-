import { onMounted, ref } from 'vue'
import { profile, type Project } from '@/data/projects'

export interface LiveRepoMeta {
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  updated: string
  url: string
  topics: string[]
}

export interface EnrichedProject extends Project {
  meta: LiveRepoMeta | null
}

/**
 * Fetches the public repositories for the profile owner straight from the
 * GitHub REST API and merges the live metadata over the curated project data.
 *
 * - Every repository link points at the verified repo name, so links are
 *   correct whether or not the request succeeds.
 * - When the API is unreachable or rate-limited we silently fall back to the
 *   curated dataset — the section never shows an error state to a visitor.
 * - Only real values from the API are surfaced (description, language, stars,
 *   last push). Nothing is synthesised.
 */
const API_URL = `https://api.github.com/users/${profile.githubHandle}/repos?per_page=100&sort=updated`

const liveMeta = ref<Map<string, LiveRepoMeta>>(new Map())
const status = ref<'idle' | 'loading' | 'live' | 'fallback'>('idle')

function toMeta(repo: {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string | null
  html_url: string
  topics?: string[]
}): LiveRepoMeta {
  return {
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updated: repo.pushed_at ? repo.pushed_at.slice(0, 10) : '',
    url: repo.html_url,
    topics: repo.topics ?? [],
  }
}

export function useGithubRepos() {
  async function load() {
    if (status.value !== 'idle') return
    status.value = 'loading'

    try {
      const response = await fetch(API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!response.ok) throw new Error(`GitHub responded ${response.status}`)

      const payload: unknown = await response.json()
      if (!Array.isArray(payload)) throw new Error('Unexpected GitHub payload')

      const map = new Map<string, LiveRepoMeta>()
      for (const entry of payload as Parameters<typeof toMeta>[0][]) {
        if (entry && typeof entry.name === 'string' && typeof entry.html_url === 'string') {
          map.set(entry.name, toMeta(entry))
        }
      }
      if (map.size === 0) throw new Error('No repositories returned')

      liveMeta.value = map
      status.value = 'live'
    } catch {
      // Rate-limited, offline or blocked — curated data stands on its own.
      liveMeta.value = new Map()
      status.value = 'fallback'
    }
  }

  function enrich(project: Project): EnrichedProject {
    const meta = liveMeta.value.get(project.repo) ?? null
    return {
      ...project,
      meta,
      updated: meta?.updated || project.updated,
      language: meta?.language || project.language,
      // A live GitHub description replaces the curated tagline when present.
      tagline: meta?.description?.trim() || project.tagline,
    }
  }

  onMounted(load)

  return { status, liveMeta, load, enrich }
}

/**
 * Skill groups.
 *
 * `verified: true` means the technology is demonstrably used in at least one
 * public repository at https://github.com/Doeurn708 — verified by inspecting
 * repository manifests, file trees and SQL schemas. Everything else is listed
 * as a declared professional skill and is rendered without the verified marker.
 */

export interface Skill {
  name: string
  /** Present in at least one public repository */
  verified?: boolean
  note?: string
}

export interface SkillGroup {
  id: string
  label: string
  accent: string
  icon: 'monitor' | 'server' | 'database' | 'braces' | 'wrench' | 'cloud'
  summary: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    accent: 'from-aqua-300/25 to-transparent',
    icon: 'monitor',
    summary: 'Component-driven interfaces with reactive state and accessible, responsive layouts.',
    skills: [
      { name: 'Vue 3', verified: true },
      { name: 'React', verified: true },
      { name: 'JavaScript', verified: true },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS', verified: true },
      { name: 'Bootstrap', verified: true },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: 'from-aqua-300/20 to-transparent',
    icon: 'server',
    summary: 'Server-side logic, request handling, business rules and access control.',
    skills: [
      { name: 'PHP', verified: true },
      { name: 'Laravel' },
      { name: 'Java', verified: true },
      { name: 'REST API', verified: true, note: 'CRUD endpoint groups in PHP' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    accent: 'from-aqua-300/20 to-transparent',
    icon: 'database',
    summary: 'Relational modelling, foreign keys, migrations and query design.',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL', verified: true },
    ],
  },
  {
    id: 'api',
    label: 'API & Auth',
    accent: 'from-aqua-300/20 to-transparent',
    icon: 'braces',
    summary: 'Endpoint design, JSON payloads, sessions and token-based authentication.',
    skills: [
      { name: 'REST API', verified: true },
      { name: 'Laravel Sanctum' },
      { name: 'Authentication', verified: true },
      { name: 'Role-based access', verified: true },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    accent: 'from-aqua-300/20 to-transparent',
    icon: 'wrench',
    summary: 'Version control, API debugging and a fast, consistent editing workflow.',
    skills: [
      { name: 'Git', verified: true },
      { name: 'GitHub', verified: true },
      { name: 'Postman' },
      { name: 'VS Code' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    accent: 'from-aqua-300/20 to-transparent',
    icon: 'cloud',
    summary: 'Media pipelines, environment configuration and deployment workflows.',
    skills: [
      { name: 'Cloudinary' },
      { name: 'AWS' },
      // { name: 'Deployment' },
    ],
  },
]

/** Compact marquee strip — technologies named in the brief. */
export const marqueeSkills: string[] = [
  'PHP',
  'Laravel',
  'Java',
  'Spring Boot',
  'MySQL',
  'PostgreSQL',
  'Vue 3',
  'React',
  'Tailwind CSS',
  'REST API',
  'TypeScript',
  'Git',
  'GitHub',
]

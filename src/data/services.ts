export interface Service {
  number: string
  title: string
  description: string
  icon: 'monitor' | 'server' | 'layers' | 'database'
  points: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Modern responsive interfaces using Vue 3, React, Tailwind CSS and Bootstrap.',
    icon: 'monitor',
    points: ['Vue 3 & React', 'Tailwind CSS', 'Component architecture'],
  },
  {
    number: '02',
    title: 'Backend Development',
    description: 'Laravel and Spring Boot APIs with clean architecture and authentication.',
    icon: 'server',
    points: ['PHP & Laravel', 'Java & Spring Boot', 'Auth & roles'],
  },
  {
    number: '03',
    title: 'Full-Stack Applications',
    description: 'Complete frontend + backend + database applications.',
    icon: 'layers',
    points: ['End-to-end delivery', 'Schema design', 'Admin dashboards'],
  },
  {
    number: '04',
    title: 'API & Database',
    description: 'REST APIs, PostgreSQL, MySQL, authentication and data management.',
    icon: 'database',
    points: ['REST endpoints', 'PostgreSQL & MySQL', 'Token auth'],
  },
]

export interface JourneyStep {
  stage: string
  period: string
  summary: string
  detail: string
  evidence?: string
}

/**
 * Learning / delivery journey. The ordering mirrors the actual progression
 * visible across the public repositories on GitHub.
 */
export const journey: JourneyStep[] = [
  {
    stage: 'Frontend Development',
    period: 'Foundation',
    summary: 'HTML, CSS and JavaScript fundamentals.',
    detail:
      'Started with semantic markup, responsive layout and vanilla JavaScript interactivity before moving to a component model.',
    evidence: 'Plain HTML / CSS / JS projects',
  },
  {
    stage: 'PHP & MySQL',
    period: 'Server-side',
    summary: 'Procedural PHP backed by relational databases.',
    detail:
      'Learned queries, prepared statements and schema design by building multi-table applications in raw PHP.',
    evidence: 'system-management, crud_mvc',
  },
  {
    stage: 'Architecture',
    period: 'MVC',
    summary: 'Separating controllers, models and views.',
    detail:
      'Refactored procedural code into controller / model / view layers with a front controller and shared helper classes.',
    evidence: 'crud_mvc',
  },
  {
    stage: 'Middleware & Auth',
    period: 'Security',
    summary: 'Sessions, role checks and protected routes.',
    detail:
      'Added authentication flows, hashed passwords and middleware that guards admin routes and enforces user roles.',
    evidence: 'crud-midleware, Team-6-student-management',
  },
  {
    stage: 'REST API',
    period: 'Integration',
    summary: 'One CRUD endpoint group per entity.',
    detail:
      'Exposed the data layer over HTTP so separate interfaces could consume it, then consumed those endpoints with AJAX.',
    evidence: 'api/ in crud-midleware & Team-6-student-management',
  },
  {
    stage: 'Vue 3',
    period: 'Frontend framework',
    summary: 'Component-driven SPAs with routing and state.',
    detail:
      'Moved to Vue 3 with Vue Router, Pinia stores, reactive components and Tailwind CSS for the visual system.',
    evidence: 'ORDER-FOOD, Order-Food-Etec, Library_System',
  },
  {
    stage: 'Java',
    period: 'Second language',
    summary: 'Strong typing and object-oriented design.',
    detail:
      'Studied encapsulation, inheritance, polymorphism and method overriding in Java as runnable, isolated demos.',
    evidence: 'Java_OOP',
  },
  {
    stage: 'React & Tailwind',
    period: 'Broader frontend',
    summary: 'A second component model and utility-first CSS.',
    detail:
      'Built a React storefront with Tailwind CSS, React Router and carousel-based merchandising.',
    evidence: 'Airpod-Shop',
  },
  {
    stage: 'Full-Stack Delivery',
    period: 'Today',
    summary: 'Schema, API, interface and admin tooling as one system.',
    detail:
      'Shipping complete applications where the database, the API layer and the interface are designed together.',
    evidence: 'crud-midleware, Team-6-student-management',
  },
  {
    stage: 'Cloud & Deployment',
    period: 'Next',
    summary: 'Media pipelines and production deployment.',
    detail:
      'Extending current work into media management, environment configuration and deployed environments.',
  },
]

export interface Stat {
  value: string
  label: string
  /** Real, verifiable numbers only */
  verified: boolean
}

export const stats: Stat[] = [
  { value: '15', label: 'Public repositories', verified: true },
  { value: '11', label: 'Featured projects', verified: true },
  { value: '3', label: 'Languages shipped', verified: true },
  { value: '6', label: 'Technology areas', verified: true },
]

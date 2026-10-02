export type Locale = 'en' | 'km'

export interface Messages {
  [key: string]: string
}

const en: Messages = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.work': 'Work',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open navigation menu',
  'nav.closeMenu': 'Close navigation menu',
  'nav.language': 'Language',
  'nav.skipToContent': 'Skip to main content',

  'hero.eyebrow': 'Full-Stack Developer',
  'hero.line1': 'I build modern',
  'hero.line2': 'web experiences',
  'hero.line3': 'that work.',
  'hero.alt':
    'Full-stack web development with clean architecture, modern UI, and reliable APIs.',
  'hero.description':
    "I'm a Full-Stack Developer focused on building scalable web applications using Laravel, Vue 3, PostgreSQL, MySQL, REST APIs, and modern frontend technologies.",
  'hero.ctaPrimary': 'View My Work',
  'hero.ctaSecondary': "Let's Talk",
  'hero.available': 'Available for development projects',
  'hero.portraitAlt': 'Portrait of Chorm Chandouern, Full-Stack Developer',
  'hero.badgeRole': 'Full-Stack Developer',
  'hero.badgeStack': 'PHP · Laravel · Vue 3',
  'hero.scroll': 'Scroll',

  'stats.repositories': 'Public repositories',
  'stats.projects': 'Featured projects',
  'stats.languages': 'Languages shipped',
  'stats.areas': 'Technology areas',

  'about.eyebrow': 'About Me',
  'about.title': 'I turn ideas into',
  'about.titleAccent': 'working digital products.',
  'about.body1':
    'I work across both frontend and backend development, which means I can own a feature from the database schema all the way to the pixel a user clicks.',
  'about.body2':
    'My default stack is Laravel or PHP on the server, Vue 3 or React in the browser, and PostgreSQL or MySQL underneath. I care about clean separation of concerns, reliable APIs, and interfaces that stay usable on a small phone as well as a wide desktop.',
  'about.frontend': 'Frontend',
  'about.backend': 'Backend',
  'about.database': 'Database',
  'about.api': 'API',
  'about.tools': 'Tools',
  'about.cloud': 'Cloud',
  'about.pillars': 'What I bring',
  'about.pillar1': 'End-to-end ownership',
  'about.pillar1Text':
    'Schema, API and interface are designed together, so features ship without a handover gap.',
  'about.pillar2': 'Clean architecture',
  'about.pillar2Text':
    'Controllers, services and views stay separated, keeping the codebase readable as it grows.',
  'about.pillar3': 'Reliable interfaces',
  'about.pillar3Text':
    'Responsive, accessible UI with real loading, error and empty states — not just a happy path.',
  'about.ctaGitHub': 'See the code',
  'about.ctaContact': 'Work together',

  'skills.eyebrow': 'Capabilities',
  'skills.title': 'The stack I',
  'skills.titleAccent': 'build with.',
  'skills.description':
    'Technologies I use to design, build, connect and ship real applications.',
  'skills.verifiedNote':
    'A filled dot marks a technology that is demonstrably used in one of my public repositories.',
  'skills.verified': 'In public repos',

  'work.eyebrow': 'Selected Work',
  'work.title': 'Projects built',
  'work.titleAccent': 'from real repositories.',
  'work.description':
    'Every project below is a public repository — not a concept. Code, structure and features reflect what is actually in the code.',
  'work.featured': 'Featured',
  'work.viewProject': 'View Project',
  'work.viewRepo': 'Source',
  'work.liveDemo': 'Live Demo',
  'work.allProjects': 'View all projects',
  'work.githubProfile': 'GitHub Profile',
  'work.updated': 'Updated',
  'work.language': 'Language',
  'work.repo': 'Repository',
  'work.loading': 'Syncing with GitHub…',
  'work.live': 'Live data from GitHub',
  'work.cached': 'Curated repository data',
  'work.noDemo': 'No public demo deployed',
  'work.stack': 'Technology',
  'work.files': 'Repository structure',

  'detail.overview': 'Overview',
  'detail.problem': 'Problem',
  'detail.solution': 'Solution',
  'detail.features': 'Features',
  'detail.stack': 'Technology stack',
  'detail.architecture': 'Architecture',
  'detail.close': 'Close',
  'detail.openRepo': 'Open repository',
  'detail.liveDemo': 'Live Demo',
  'detail.prev': 'Previous project',
  'detail.next': 'Next project',

  'services.eyebrow': 'What I Do',
  'services.title': 'Four ways I can',
  'services.titleAccent': 'help your product.',
  'services.description':
    'From a single interface to a complete system — backend, database and everything in between.',
  'services.cta': 'Start a project',

  'journey.eyebrow': 'Journey',
  'journey.title': 'How I got',
  'journey.titleAccent': 'here.',
  'journey.description':
    'A progression from frontend fundamentals to shipping complete full-stack applications.',
  'journey.evidence': 'In repository',

  'contact.eyebrow': 'Contact',
  'contact.line1': "Let's build",
  'contact.line2': 'something together.',
  'contact.description':
    'Have a project idea, collaboration opportunity, or development work in mind? Let’s talk.',
  'contact.github': 'GitHub',
  'contact.email': 'Email',
  'contact.telegram': 'Telegram',
  'contact.linkedin': 'LinkedIn',
  'contact.formTitle': 'Send a message',
  'contact.formDescription':
    'Fill in the form and it will open in your email client, ready to send.',
  'contact.name': 'Name',
  'contact.emailField': 'Email',
  'contact.subject': 'Subject',
  'contact.message': 'Message',
  'contact.namePlaceholder': 'Your name',
  'contact.emailPlaceholder': 'you@example.com',
  'contact.subjectPlaceholder': 'What is this about?',
  'contact.messagePlaceholder': 'Tell me about the project, timeline, and what you need built.',
  'contact.submit': 'Send Message',
  'contact.required': 'Required',
  'contact.invalidEmail': 'Enter a valid email address',
  'contact.errorName': 'Please enter your name',
  'contact.errorSubject': 'Please add a short subject',
  'contact.errorMessage': 'Please write a message (at least 10 characters)',
  'contact.success': 'Your email client is ready — press send to deliver.',
  'contact.copy': 'Copy email',
  'contact.copied': 'Copied',
  'contact.responseTime': 'Typical response within 24 hours.',

  'footer.tagline': 'Full-Stack Developer',
  'footer.rights': 'All rights reserved.',
  'footer.builtWith': 'Built with Vue 3, Vite, TypeScript and Tailwind CSS.',
  'footer.backToTop': 'Back to top',

  'common.language': 'Language',
}

const km: Messages = {
  'nav.home': 'ទំព័រដើម',
  'nav.about': 'អំពីខ្ញុំ',
  'nav.work': 'ការងារ',
  'nav.services': 'សេវា',
  'nav.contact': 'ទំនាក់ទំព័រ',
  'nav.menu': 'ម៉ឺនុ',
  'nav.openMenu': 'បើកម៉ឺនុ',
  'nav.closeMenu': 'បិទម៉ឺនុ',
  'nav.language': 'ភាសា',
  'nav.skipToContent': 'ទៅកាន់មាតិកាសំខាន់',

  'hero.eyebrow': 'អ្នកបង្កើតពេញគ្រប់ជែន — Full-Stack',
  'hero.line1': 'ខ្ញុំសង្កើត',
  'hero.line2': 'បទពិសោធន៍គេហទំព័រ',
  'hero.line3': 'ដែលដំណើរការពិត។',
  'hero.alt': 'ការអភិវឌ្ឍន៍គេហទំព័រពេញគ្រប់គ្រាប់ស្ថាប័នច្បាស់ ចំណុចផ្ទៃ UI ម៉ែតធី និង API បានគារពារយុត្តិធម៌។',
  'hero.description':
    'ខ្ញុំជាអ្នកបង្កើតពេញគ្រប់ជែន ដែលផ្តោតលើការបង្កើតកម្មវិធីគេហទំព័រដែលអាចពង្រីករណ៍ ដោយប្រើ Laravel, Vue 3, PostgreSQL, MySQL, REST API និងបច្ចេកវិទ្យាសាស្ត្រទំព័រទំនាក់ដោយទំនើន។',
  'hero.ctaPrimary': 'មើលការងាររបស់ខ្ញុំ',
  'hero.ctaSecondary': 'ត្រូវការនិគ្រោះ',
  'hero.available': 'អាចរកបានសម្រាប់ការងារអភិវឌ្ឍន៍',
  'hero.portraitAlt': 'រូបថតរបស់ ជំរម ជន ឌួន — អ្នកបង្កើតពេញគ្រប់ជែន',
  'hero.badgeRole': 'Full-Stack Developer',
  'hero.badgeStack': 'PHP · Laravel · Vue 3',
  'hero.scroll': 'អូសចូល',

  'stats.repositories': 'ឃ្លាំងកូដសាធារណៈឯករាជ្យ',
  'stats.projects': 'គម្រោងសំខាន់',
  'stats.languages': 'ភាសាកម្មវិធី',
  'stats.areas': 'ផ្នែកបច្ចេកវិទ្យា',

  'about.eyebrow': 'អំពីខ្ញុំ',
  'about.title': 'ខ្ញុំប្រែមន្ថនៈ',
  'about.titleAccent': 'ទៅជាផលិតផលឌីជាក់.',
  'about.body1':
    'ខ្ញុំធ្វើការទាំងផ្នែកខាងមុខ និងខាងក្រោយ ដូច្នេះខ្ញុំអាចគ្រប់គ្រងមុខវិជ្ជាពីរបកប្រភពទិន្នន័យទំព័រ រហូតដល់ចំណុចអត្ថបទដែលអ្នកប្រើប្រាស់។',
  'about.body2':
    'ប្រព័ន្ធសំខាន់របស់ខ្ញុំគឺ Laravel ឬ PHP នៅម៉ាស៊ីនមេ វិធី Vue 3 ឬ React នៅកម្មវិធីរូបាយ និង PostgreSQL ឬ MySQL នៅខាងក្រោម។ ខ្ញុំយកចិត្តលើការបែងចែកការងារយ៉ាងច្បាស់ កន្លែង API ដែលគាតរឹង និងផ្ទៃប្រើប្រាស់ដែលសមស្របទាំងលើទូរស័ព្ទ និងកុំព្យាករណ៍ធំ។',
  'about.frontend': 'ខាងមុខ',
  'about.backend': 'ខាងក្រោយ',
  'about.database': 'មូលដ្ឋានទិន្នន័យ',
  'about.api': 'API',
  'about.tools': 'ឧបកប្រវត្តិ',
  'about.cloud': 'Cloud',
  'about.pillars': 'អ្វីដែលខ្ញុំផ្តល់បាន',
  'about.pillar1': 'ការគ្រប់គ្រងពេញលេញ',
  'about.pillar1Text':
    'របកប្រភពទិន្នន័យ API និងផ្ទៃប្រើប្រាស់ត្រូវបានរចនាជាមួយគ្នា ដូច្នេះមុខវិជ្ជាអាចបានដាក់ដោយគ្មានបរិស័ព្ទកថាង។',
  'about.pillar2': 'ស្ថាប័នច្បាស់ល្អ',
  'about.pillar2Text':
    'controller, service និង view បានបែងចែកដារ ធ្វើឱ្យកូដសំខាន់ងាយអាន និងថែសម្ងាត់បានពេលវាល្អឡើងៗ',
  'about.pillar3': 'ផ្ទៃប្រើប្រាស់គាតរឹង',
  'about.pillar3Text':
    'ផ្ទៃប្រើប្រាស់ឆ្លើយតបទៅទូរស័ព្ទ ជម្រើសបាន មានសកល្បងពេលផ្ទុកទិន្នន័យ កំហុស និងលីនង់ — មិនត្រឹមតែផ្លូវល្អ។',
  'about.ctaGitHub': 'មើលកូដ',
  'about.ctaContact': 'ធ្វើការរួមការងារ',

  'skills.eyebrow': 'សមត្ថភាព',
  'skills.title': 'ប្រព័ន្ធ',
  'skills.titleAccent': 'ដែលខ្ញុំប្រើសង្កើត។',
  'skills.description':
    'បច្ចេកវិទ្យាដែលខ្ញុំប្រើដើម្បីរចនា សង្កើត ភ្ជាប់ និងបញ្ជូនកម្មវិធីពេញលេញ។',
  'skills.verifiedNote':
    'ចំណុចពេញមែន សម្គាល់បច្ចេកវិទ្យាដែលត្រូវបានប្រើក្នុងឃ្លាំងកូដសាធារណៈឯករាជ្យរបស់ខ្ញុំ។',
  'skills.verified': 'មានក្នុងឃ្លាំងកូដ',

  'work.eyebrow': 'ការងារបានជ្រើសរើស',
  'work.title': 'គម្រោងដែល',
  'work.titleAccent': 'មកពីឃ្លាំងកូដពិត។',
  'work.description':
    'គម្រោងរាល់នៅខាងក្រោមគឺជាឃ្លាំងកូដសាធារណៈឯករាជ្យ — មិនមែនជាគំនិតតែ។ កូដ របកប្រព័ន្ធ និងមុខវិជ្ជាត្រូវបានឆ្លើយតបតាមអ្វីដែលមានជាក់លាក់ក្នុងកូដ។',
  'work.featured': 'លេចធំ',
  'work.viewProject': 'មើលគម្រោង',
  'work.viewRepo': 'កូដទ្រង់ទ្រាយ',
  'work.liveDemo': 'បង្ហាញផ្ទាល់',
  'work.allProjects': 'មើលគម្រោងទាំងអស់',
  'work.githubProfile': 'គណនី GitHub',
  'work.updated': 'បានធ្វើបច្ចុប្បន្នភាព',
  'work.language': 'ភាសា',
  'work.repo': 'ឃ្លាំងកូដ',
  'work.loading': 'កំពុងធ្វើសមការជាមួយ GitHub…',
  'work.live': 'ទិន្នន័យផ្ទាល់ពី GitHub',
  'work.cached': 'ទិន្នន័យឃ្លាំងកូដដែលបានរៀបចំ',
  'work.noDemo': 'មិនទាន់មានការបង្ហាញផ្ទាល់',
  'work.stack': 'បច្ចេកវិទ្យា',
  'work.files': 'របកប្រព័ន្ធឃ្លាំងកូដ',

  'detail.overview': 'សេចក្តីសង្ខេប',
  'detail.problem': 'បញ្ហា',
  'detail.solution': 'ដំណោះស្រាយ',
  'detail.features': 'មុខវិជ្ជា',
  'detail.stack': 'ប្រព័ន្ធបច្ចេកវិទ្យា',
  'detail.architecture': 'ស្ថាប័ន',
  'detail.close': 'បិទ',
  'detail.openRepo': 'បើកឃ្លាំងកូដ',
  'detail.liveDemo': 'បង្ហាញផ្ទាល់',
  'detail.prev': 'គម្រោងមុន',
  'detail.next': 'គម្រោងបន្ទាប់',

  'services.eyebrow': 'អ្វីដែលខ្ញុំធ្វើ',
  'services.title': 'ដំណឹងដែលខ្ញុំអាច',
  'services.titleAccent': 'ជួយផលិតផលរបស់អ្នក។',
  'services.description':
    'ពីផ្ទៃប្រើប្រាស់តែមួយ ដល់ប្រព័ន្ធពេញលេញ — ខាងក្រោយ មូលដ្ឋានទិន្នន័យ និងអ្វីផ្សេងៗទៀត។',
  'services.cta': 'ចាប់ផ្តើមគម្រោង',

  'journey.eyebrow': 'ការធ្វើដំណើរ',
  'journey.title': 'ពីរបីរហូតមក',
  'journey.titleAccent': 'ដល់ទីនេះ។',
  'journey.description':
    'ការវឌ្ឍនភាពពីមូលដ្ឋានខាងមុខ ដល់ការបញ្ជូនកម្មវិធីពេញគ្រប់ជែន។',
  'journey.evidence': 'មានក្នុងឃ្លាំងកូដ',

  'contact.eyebrow': 'ទំនាក់ទំព័រ',
  'contact.line1': 'សូមកសាង',
  'contact.line2': 'អ្វីមួយជាមួយគ្នា។',
  'contact.description':
    'មានគំនិតគម្រោង ឱកាសសហគ្រាម ឬការងារអភិវឌ្ឍន៍ដែលអ្នកចង់ឱ្យខ្ញុំធ្វើ? សូមត្រូវការនិគ្រោះ។',
  'contact.github': 'GitHub',
  'contact.email': 'អ៊ីមែល',
  'contact.telegram': 'តេលីគ្រាម',
  'contact.linkedin': 'LinkedIn',
  'contact.formTitle': 'ផ្ញើសារ',
  'contact.formDescription':
    'បំពេញទម្រង់ ហើយវានឹងបើកក្នុងកម្មវិធីអ៊ីមែលរបស់អ្នក ដើម្បីផ្ញើ។',
  'contact.name': 'ឈ្មោះ',
  'contact.emailField': 'អ៊ីមែល',
  'contact.subject': 'ប្រធានបទ',
  'contact.message': 'សារ',
  'contact.namePlaceholder': 'ឈ្មោះរបស់អ្នក',
  'contact.emailPlaceholder': 'you@example.com',
  'contact.subjectPlaceholder': 'តើជាប្រទេសអំពីអ្វី?',
  'contact.messagePlaceholder':
    'ប្រាប់ខ្ញុំអំពីគម្រោង រយៈពេល និងអ្វីដែលអ្នកត្រូវការឱ្យសង់។',
  'contact.submit': 'ផ្ញើសារ',
  'contact.required': 'ត្រូវការ',
  'contact.invalidEmail': 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលឲ្យបានត្រឹមត្រូវ',
  'contact.errorName': 'សូមបញ្ចូលឈ្មោះរបស់អ្នក',
  'contact.errorSubject': 'សូមបញ្ចូលប្រធានបទសង្ខេប',
  'contact.errorMessage': 'សូមសរសេរសារ (យ៉ាងតិច 10 តួអក្សរ)',
  'contact.success': 'កម្មវិធីអ៊ីមែលរបស់អ្នករួចរាល់ — សូមចុចផ្ញើ។',
  'contact.copy': 'ចម្លងអាសយដ្ឋាន',
  'contact.copied': 'បានចម្លង',
  'contact.responseTime': 'ជាធម្មតាឆ្លើយតបក្នុងរយៈពេល 24 ម៉ោង។',

  'footer.tagline': 'Full-Stack Developer',
  'footer.rights': 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
  'footer.builtWith': 'បង្កើតដោយ Vue 3, Vite, TypeScript និង Tailwind CSS។',
  'footer.backToTop': 'ត្រឡប់ទៅខាងលើ',

  'common.language': 'ភាសា',
}

export const messages: Record<Locale, Messages> = { en, km }

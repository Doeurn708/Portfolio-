/**
 * Project data sourced directly from the public repositories at
 * https://github.com/Doeurn708?tab=repositories
 *
 * Every entry below was verified against the actual repository contents
 * (file structure, manifests, SQL schemas). Nothing here is invented.
 * The Projects section also fetches live GitHub metadata at runtime and
 * merges it over this baseline (see composables/useGithubRepos.ts).
 */

export interface ProjectFeature {
  label: string
  detail?: string
}

export interface Project {
  /** GitHub repository name — used as the key for live GitHub API merging */
  repo: string
  title: string
  /** Short tagline shown on the card */
  tagline: string
  /** Long-form overview for the detail modal */
  overview: string
  problem: string
  solution: string
  /** Only features that genuinely exist in the repository */
  features: ProjectFeature[]
  stack: string[]
  architecture: string[]
  /** Primary language reported by GitHub */
  language: string
  /** Verified last-push date (YYYY-MM-DD) from GitHub */
  updated: string
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Learning'
  featured?: boolean
  liveUrl?: string
}

export const profile = {
  name: "Chorm Chandouern",
  shortName: "CHORM CHANDOUERN",
  role: "Full-Stack Developer",
  location: "Cambodia",
  github: "https://github.com/Doeurn708",
  githubHandle: "Doeurn708",
  email: "chandouern708@gmail.com",
  linkedin: "https://www.linkedin.com/in/Doeurn708",
  telegram: "https://t.me/chorm_chandoeurn",
  available: true,
  availabilityLabel: "Available for development projects",
} as const;

export const projects: Project[] = [
  {
    repo: 'e-commerce-frontend',
    title: 'D Shop — Full-Stack E-Commerce Storefront',
    tagline:
      'A Vue 3 storefront with catalogue, cart, map-based checkout, customer accounts and a complete admin console, backed by a Laravel API.',
    overview:
      'The customer and admin front end for a Laravel-powered shop. Shoppers browse categories, filter and search products, manage a persistent cart and wishlist, sign in with email or Google, reset a password by OTP, place an order against a map-picked delivery pin and follow its status. Admins get a dashboard plus product, category, order and customer management. Built with Vue 3, TypeScript, Pinia, Vue Router and Tailwind; English and Khmer are both supported, along with a persisted dark mode.',
    problem:
      'A shop has to keep a basket consistent across routes, protect customer and admin areas differently, and let an administrator manage catalogue and orders without a separate back-office application.',
    solution:
      'Use one Axios client with a Sanctum bearer token and centralised 401 handling, split state into focused Pinia stores, gate routes with auth and admin meta, render one component system in Tailwind, and mirror the API resources with typed modules under src/api.',
    features: [
      { label: 'Catalogue browsing', detail: 'Home, shop, category and product routes' },
      { label: 'Search, filters & sorting', detail: 'ProductFilter plus paginated category / price / stock queries' },
      { label: 'Persistent cart', detail: 'Pinia cart in localStorage, rehydrated from live product data' },
      { label: 'Wishlist', detail: 'Persisted Pinia wishlist in stores/wishlist.ts' },
      { label: 'Authentication', detail: 'Login, registration and Sanctum token persistence' },
      { label: 'OTP password reset', detail: 'Request code, verify it, then set a new password' },
      { label: 'Google OAuth callback', detail: 'GoogleCallbackView receives the API token' },
      { label: 'Profile & avatar', detail: 'EditProfileModal with multipart profile update' },
      { label: 'Map checkout', detail: 'CheckoutMap captures delivery coordinates; moving the pin revokes confirmation' },
      { label: 'Payment selection', detail: 'Cash on delivery or online with a locally generated KHQR placeholder' },
      { label: 'Order tracking', detail: 'Customer order list and detail with status badges' },
      { label: 'Admin dashboard', detail: 'Revenue, totals, low stock and recent activity' },
      { label: 'Admin catalogue CRUD', detail: 'Product and category tables, forms and image upload' },
      { label: 'Admin orders & customers', detail: 'Status changes and customer management' },
      { label: 'EN / KH + dark mode', detail: 'Pinia i18n and theme stores persisted in localStorage' },
      { label: 'Responsive UI', detail: 'Tailwind CSS with Lucide icons' },
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vue Router', 'Axios', 'Vite'],
    architecture: [
      'src/api/ — typed Axios modules (auth, products, categories, orders, customers, dashboard)',
      'src/stores/ — auth, cart, catalog, product, wishlist, theme, i18n, toast',
      'src/views/ — storefront, auth, account and admin screens',
      'src/components/ — product, cart, checkout and admin UI',
      'src/layouts/ — AccountLayout and AdminLayout',
      'src/router/index.ts — auth and admin guards with lazy routes',
      'src/utils/ — Google Maps, image handling, formatting, password reset',
      'src/types/ — shared API models',
    ],
    language: 'Vue',
    updated: '2026-10-15',
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://store-padon.vercel.app',
  },
  {
    repo: 'e-commerce-backend',
    title: 'E-Commerce REST API — Laravel + Sanctum',
    tagline:
      'A Laravel 12 REST API powering a full storefront: token auth, OTP reset, Google login, catalogue, orders, payments and an admin dashboard.',
    overview:
      'The API behind the D Shop storefront. Laravel 12 with Sanctum token authentication, role-aware middleware, Cloudinary-backed product, category and avatar images, OTP email verification, Google OAuth, transactional order creation, payment records and dashboard statistics. Product endpoints support search, filters, sorting, pagination, trending and related products.',
    problem:
      'A storefront needs one authoritative backend for identity, stock, order totals and admin reporting. Spreading that logic across page controllers leads to inconsistent prices and permissions.',
    solution:
      'Model users, categories, products, orders, order items, payments and OTPs with migrations and Eloquent relationships; expose a single /api surface; authenticate with Sanctum; gate admin actions with role middleware; keep stock and totals inside database transactions; and store media on Cloudinary.',
    features: [
      { label: 'Sanctum token auth', detail: 'Register, login, logout and current user in AuthController' },
      { label: 'Role middleware', detail: 'app/Http/Middleware/RoleMiddleware.php gates admin-only routes' },
      { label: 'Google OAuth', detail: 'Socialite redirect and callback issuing an API token' },
      { label: 'OTP password reset', detail: 'Six-digit email code with expiry, verification and replay protection' },
      { label: 'Catalogue API', detail: 'Search, category / price / stock filters, sorting and pagination' },
      { label: 'Trending & related products', detail: 'Trending ranked by real non-cancelled sales; related by category' },
      { label: 'Cloudinary media', detail: 'Product, category and avatar images via CloudinaryImageStore' },
      { label: 'Transactional orders', detail: 'Server-priced totals, stock checks and decrement inside DB::transaction' },
      { label: 'Cancellation restores stock', detail: 'Pending orders return reserved quantities on cancel' },
      { label: 'Payments', detail: 'Payment records per order with paid_at tracking' },
      { label: 'Admin dashboard', detail: 'Totals, revenue, pending orders, low stock and recent activity' },
      { label: 'Profile editing', detail: 'Multipart avatar upload handled on POST, PUT and PATCH' },
      { label: 'User administration', detail: 'Admin CRUD for customers and roles' },
      { label: 'Feature tests', detail: 'OTP, product image and profile coverage in tests/Feature' },
      { label: 'Deployment config', detail: 'railway.json plus CORS / Cloudinary configuration' },
    ],
    stack: ['Laravel 12', 'PHP', 'Sanctum', 'MySQL', 'REST API', 'Cloudinary', 'Socialite'],
    architecture: [
      'routes/api.php — public and Sanctum-protected route groups',
      'app/Http/Controllers — Auth, GoogleAuth, Otp, Product, Category, Order, Payment, Users, Dashboard',
      'app/Http/Middleware/RoleMiddleware.php — admin gate',
      'app/Models + migrations — users, categories, products, orders, order_items, payments, otps',
      'app/Services/CloudinaryImageStore.php — upload, replace and delete media',
      'config/cors.php + config/cloudinary.php — cross-origin and media configuration',
      'tests/Feature — OTP, product image and profile tests',
      'railway.json — Railway deployment settings',
    ],
    language: 'PHP',
    updated: '2026-10-16',
    category: 'Backend',
  },
  {
    repo: 'crud-midleware',
    title: 'E-Commerce Product Management Platform',
    tagline:
      'A complete product and category management system with a REST-style PHP API, an AJAX-driven admin panel and a customer-facing store.',
    overview:
      'A full-stack PHP e-commerce platform built around a products / categories / users schema. A dedicated api/ layer exposes read and write endpoints, the admin panel talks to that layer over AJAX so screens update without full page reloads, and a client storefront renders the catalogue to customers. Authentication and role checks gate the admin area.',
    problem:
      'Managing a product catalogue normally means repeating the same validation and permission logic across many pages. Fetching fresh data after every edit also meant full reloads, which made the admin panel feel slow and inconsistent.',
    solution:
      'Split the application into an api/ layer, an ajax/ layer that consumes it, and separate admin/ and client/ front-ends. Role-aware middleware protects the admin routes, MySQL stores the catalogue with proper foreign keys, and uploaded product images are written to a dedicated uploads directory and referenced from the products table.',
    features: [
      { label: 'User authentication', detail: 'frontend/login.php, frontend/register.php, api/auth-handler.php' },
      { label: 'Role-based access', detail: "users.role column enforced by middleware/auth.php" },
      { label: 'Product catalogue CRUD', detail: 'api/products.php plus get / insert / edit / delete endpoints' },
      { label: 'Category management', detail: 'api/category.php plus get / insert / edit / delete endpoints' },
      { label: 'Admin dashboard', detail: 'admin/dashboard.php with sidebar shell in admin/include/aside.php' },
      { label: 'Product image upload', detail: 'public/uploads with an image column on the products table' },
      { label: 'AJAX-driven screens', detail: 'ajax/category/category.js and ajax/products/product.js' },
      { label: 'Customer storefront', detail: 'client/index.php presenting the catalogue' },
    ],
    stack: ['PHP', 'MySQL', 'REST API', 'AJAX', 'JavaScript', 'CSS'],
    architecture: [
      'index.php — front controller',
      'api/ — JSON endpoints (auth, products, categories)',
      'ajax/ — client-side fetch + DOM rendering',
      'admin/ — dashboard, product & category management',
      'frontend/ — login and registration screens',
      'client/ — customer-facing store',
      'middleware/ — session and role guards',
      'config/ — database connection',
      'sql.sql — users / categories / products schema',
    ],
    language: 'PHP',
    updated: '2026-07-19',
    category: 'Full-Stack',
  },
  {
    repo: 'Team-6-student-management',
    title: 'Student Management System with REST API',
    tagline:
      'A school management platform covering students, classes, subjects and enrollments, with a CRUD API layer and role-aware admin screens.',
    overview:
      'A PHP application for managing students, classes, subjects and enrollments. Each entity has its own CRUD endpoint group under api/, front-end scripts under js/ drive the admin screens, and uploaded student photos are stored in public/uploads and served back to the interface.',
    problem:
      'Student records, classes, subjects and enrollments are tightly related. Managing them by hand across separate sheets guarantees drift, and there was no single interface to keep records consistent.',
    solution:
      'Model the domain in MySQL with foreign keys, expose one CRUD endpoint group per entity behind an api/ folder, and drive a consistent admin interface from js/ modules. Authentication and role middleware keep the admin area protected, while image upload is handled server-side into a dedicated uploads folder.',
    features: [
      { label: 'Student records CRUD', detail: 'api/students_crud/ — get, insert, edit, delete' },
      { label: 'Class management CRUD', detail: 'api/class_crud/ — get, insert, edit, delete' },
      { label: 'Subject management CRUD', detail: 'api/subject_crud/ — get, insert, edit, delete' },
      { label: 'Enrollment tracking', detail: 'api/enrollment_crud/ links students to classes and subjects' },
      { label: 'Admin dashboard', detail: 'views/admin/dashboard.php with sidebar navigation' },
      { label: 'Student photo upload', detail: 'public/uploads with timestamped filenames' },
      { label: 'Authentication & roles', detail: 'controller/AuthController.php, middleware/auth.php' },
      { label: 'Notification feedback', detail: 'js/notifications.js for action feedback' },
    ],
    stack: ['PHP', 'MySQL', 'REST API', 'JavaScript', 'CSS'],
    architecture: [
      'index.php — front controller',
      'api/ — per-entity CRUD endpoints',
      'controller/ — auth and student controllers',
      'js/ — one module per entity + notifications',
      'views/admin/ — dashboard, lists, add and edit forms',
      'middleware/ — session and role guards',
      'config/ — database connection',
      'database/sql.sql — users / students / subjects / classes / enrollments',
    ],
    language: 'PHP',
    updated: '2026-07-26',
    category: 'Full-Stack',
  },
  {
    repo: 'Airpod-Shop',
    title: 'Airpods Storefront — React + Tailwind',
    tagline:
      'A responsive commerce storefront for audio products, built with React, Tailwind CSS and layered carousels.',
    overview:
      'A product storefront focused on audio devices. Built with React and Tailwind CSS on Vite, it organises products into routed pages, uses layered carousel libraries for merchandising strips, and includes a contact view and a 404 route.',
    problem:
      'A product-focused landing experience needs fast, componentised rendering and a visual language that stays sharp from a phone up to a wide desktop without a heavy UI framework.',
    solution:
      'Compose the storefront from reusable React components, drive navigation with React Router, style entirely with Tailwind utilities, and layer slick-carousel and Swiper for the product strips so the catalogue stays browsable on touch devices.',
    features: [
      { label: 'Routed storefront', detail: 'react-router-dom with Home and Contact routes' },
      { label: 'Reusable components', detail: 'Navbar, SlideBar, Footer, New sections' },
      { label: 'Product carousels', detail: 'react-slick, slick-carousel and Swiper' },
      { label: 'Tailwind-first styling', detail: 'tailwindcss + postcss + autoprefixer' },
      { label: 'Product imagery', detail: 'public/Airpod asset set with logo variants' },
      { label: 'Custom 404 route', detail: 'src/404/Notfound.jsx' },
      { label: 'Lint configuration', detail: 'eslint.config.js with react-hooks and react-refresh plugins' },
    ],
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'React Router', 'Vite', 'Swiper'],
    architecture: [
      'src/App.jsx — root composition',
      'src/routes/AppRoutes.jsx — route table',
      'src/pages/ — Home, Contact, 404',
      'src/components/ — NavBar, SlideBar, Footer, New',
      'src/layout/MainLayout.jsx — shared shell',
      'public/ — product and logo imagery',
    ],
    language: 'JavaScript',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://airpod-shop.vercel.app',
  },
  {
    repo: 'Zendoone',
    title: 'Zendo Fashion Storefront — HTML/CSS',
    tagline:
      'A static fashion storefront recreation with sticky department navigation, Swiper hero and brand carousels, and dense product rows.',
    overview:
      'A single-page fashion storefront built in HTML and CSS. A sticky top bar carries department links, search, account, wishlist and cart icons; below it Swiper web components drive full-width promotional hero slides, a six-up brand strip, a second campaign banner and product carousels. Product cards show imagery, pricing, discount badges and wishlist actions. Imagery comes from the live ZANDO catalogue, with Swiper and Font Awesome loaded from CDNs.',
    problem:
      'Fashion catalogues need dense merchandising — departments, campaigns, brands and product rows — to stay scannable without a build step or framework.',
    solution:
      'Compose the page as semantic sections, use Swiper web components for every horizontal merchandising strip, and keep the visual system in one hand-written stylesheet with a sticky nav and responsive container widths.',
    features: [
      { label: 'Sticky department navigation', detail: 'WOMEN / MEN / BOYS / GIRLS with search, account, wishlist and cart icons' },
      { label: 'Promotional hero carousel', detail: 'Five Swiper slides with campaign CTAs' },
      { label: 'Brand carousel', detail: 'Six-up Swiper strip under the hero' },
      { label: 'Campaign banner', detail: 'Second full-width Swiper banner' },
      { label: 'Product carousels', detail: 'Best-seller rows built from product cards' },
      { label: 'Product cards', detail: 'Discount badges, wishlist action, price and original price' },
      { label: 'Swiper web components', detail: 'CDN bundle with per-instance slide configuration' },
      { label: 'Font Awesome icons', detail: 'CDN stylesheet for navigation and card actions' },
      { label: 'Single stylesheet', detail: 'Hand-written Index.css with container and card layout' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Swiper', 'Font Awesome'],
    architecture: [
      'index.html — full storefront markup',
      'Index.css — navigation, carousel and product-card styling',
      'img/Qr.png — local QR asset',
      'Swiper CDN — carousel behaviour',
      'Font Awesome CDN — icon set',
    ],
    language: 'HTML',
    updated: '2026-01-30',
    category: 'Frontend',
    liveUrl: 'https://zendoone-me.vercel.app',
  },
  // {
  //   repo: 'Suprices',
  //   title: 'Suprices — Interactive “Do You Love Me?” Page',
  //   tagline:
  //     'A playful single-page interaction where Yes swaps the message and GIF, while No jumps to a random spot on hover.',
  //   overview:
  //     'A small vanilla JavaScript page built as a light-hearted interaction. The Yes button changes the question to a reply and swaps the GIF; the No button relocates to a random position inside the viewport every time the pointer touches it, so it can never be clicked. HTML, CSS and JavaScript only, with no build step.',
  //   problem:
  //     'A static greeting page gives a visitor no reason to interact with it. The joke only lands if the refusal option visibly resists being chosen.',
  //   solution:
  //     'Handle both buttons in a DOMContentLoaded script: swap the text and image for Yes, and compute viewport-bounded random coordinates on mouseover for No. Keep everything in three plain files that open directly in a browser.',
  //   features: [
  //     { label: 'Yes interaction', detail: 'Swaps the question text and GIF in script.js' },
  //     { label: 'Runaway No button', detail: 'Random viewport-bounded position on mouseover' },
  //     { label: 'Single-page layout', detail: 'Centered question, GIF and button group' },
  //     { label: 'No build step', detail: 'Plain HTML, CSS and JavaScript' },
  //     { label: 'External GIF sources', detail: 'Pinterest and Giphy image URLs' },
  //     { label: 'Pill button styling', detail: 'Two red rounded buttons in style.css' },
  //   ],
  //   stack: ['HTML', 'CSS', 'JavaScript'],
  //   architecture: [
  //     'index.html — page markup',
  //     'style.css — centered layout and button styling',
  //     'script.js — Yes / No interaction logic',
  //   ],
  //   language: 'JavaScript',
  //   updated: '2026-02-20',
  //   category: 'Learning',
  //   liveUrl: 'https://suprices.vercel.app',
  // },
  {
    repo: 'system-management',
    title: 'School Management System — PHP MVC',
    tagline:
      'A structured MVC application for students, classes, subjects and enrollments with a full admin panel.',
    overview:
      'The MVC counterpart to the API-driven student system. Controllers handle each domain, an auth controller guards the app, middleware enforces sessions, and a complete admin area covers adding, editing and deleting students, classes, subjects and enrollments.',
    problem:
      'The same school data was being handled procedurally, so every new screen repeated connection, auth and validation logic.',
    solution:
      'Introduce clear controller separation per entity, centralise database access in config/database.php, guard pages with middleware/auth.php, and keep presentation in a dedicated views/ tree with admin add, edit and delete screens.',
    features: [
      { label: 'Student management', detail: 'controller/StudentController.php + admin add / edit / delete' },
      { label: 'Class management', detail: 'controller/ClassController.php + admin screens' },
      { label: 'Subject management', detail: 'controller/SubjectController.php + admin screens' },
      { label: 'Enrollment management', detail: 'controller/EnrollmentController.php linking students to classes' },
      { label: 'Authentication', detail: 'controller/AuthController.php with login, register, logout' },
      { label: 'Session middleware', detail: 'middleware/auth.php guards protected routes' },
      { label: 'Admin dashboard', detail: 'views/admin/dashboard.php with views/include/aside.php' },
      { label: 'Normalised schema', detail: 'users / students / subjects / classes / enrollments' },
    ],
    stack: ['PHP', 'MySQL', 'MVC', 'CSS'],
    architecture: [
      'index.php — front controller',
      'controller/ — Auth, Student, Class, Subject, Enrollment',
      'middleware/ — auth guards',
      'config/ — database connection',
      'views/auth/ — login, register, logout',
      'views/admin/ — dashboard, entities, Add/, Edit/, Delete/',
      'views/include/ — shared aside navigation',
      'database/sql.sql — schema',
    ],
    language: 'PHP',
    updated: '2026-07-23',
    category: 'Backend',
  },
  {
    repo: 'ORDER-FOOD',
    title: 'Food Ordering App — Vue 3 + Pinia',
    tagline:
      'A Vue 3 ordering experience with menu browsing, a persistent Pinia cart, rider contact and order tracking.',
    overview:
      'A single-page food ordering front end. Menus are browsed through routed views, the cart is held in a Pinia store, checkout collects delivery details, and customers get an order tracking view plus a direct rider contact screen. Tailwind handles the visual system.',
    problem:
      'Ordering food usually means a long, fragile form. Without shared cart state, the basket resets between the menu and the cart, and there is no way for a customer to follow an order once it is placed.',
    solution:
      'Move the basket into a Pinia store so it survives route changes, keep the menu and cart on separate routed views, and add dedicated screens for delivery contact and order progress so the customer stays informed.',
    features: [
      { label: 'Menu browsing', detail: 'views/menu/MenuView.vue driven by src/data/Food.json' },
      { label: 'Persistent cart', detail: 'stores/cart.js (Pinia) shared across routes' },
      { label: 'Cart view', detail: 'views/cart/CartView.vue with CartList and FoodCard components' },
      { label: 'Account access', detail: 'views/auth/LoginAcc.vue' },
      { label: 'Order tracking', detail: 'views/order/OrderTrackingView.vue' },
      { label: 'Rider contact', detail: 'views/order/ContactRiderView.vue' },
      { label: 'HTTP client', detail: 'axios dependency for data requests' },
      { label: 'UI feedback', detail: 'SweetAlert2 dialogs and lucide-vue-next icons' },
      { label: 'Responsive UI', detail: 'Tailwind CSS 4 via @tailwindcss/vite' },
    ],
    stack: ['Vue 3', 'Pinia', 'Tailwind CSS', 'Vue Router', 'Axios', 'Vite'],
    architecture: [
      'src/views/menu — menu browsing',
      'src/views/cart — cart and checkout',
      'src/views/order — tracking and rider contact',
      'src/views/auth — account access',
      'src/stores — Pinia cart state',
      'src/components — AppNavbar, SlideBar, FoodCard, CartList, Footer',
      'src/data/Food.json — catalogue',
      'src/layouts/LayoutApp.vue — shared shell',
    ],
    language: 'Vue',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://order-food-ecc2.vercel.app',
  },
  // {
  //   repo: 'crud_mvc',
  //   title: 'Product CRUD — PHP MVC with Role Middleware',
  //   tagline:
  //     'A compact PHP MVC application demonstrating authentication, product management and role-based route protection.',
  //   overview:
  //     'A focused MVC build that separates controllers, models and views cleanly. Auth and product controllers handle sign-in and catalogue management, a model layer wraps the products table, and middleware enforces both authentication and role checks on admin routes.',
  //   problem:
  //     'Without a clear controller / model / view split, admin CRUD code becomes tangled and role rules end up scattered across page files.',
  //   solution:
  //     'Give each concern its own controller and model, centralise redirects and messages in handle/, and enforce access with middleware/auth.php plus a dedicated role check before any admin view renders.',
  //   features: [
  //     { label: 'Authentication flow', detail: 'controller/AuthController.php with login, register, logout views' },
  //     { label: 'Product management', detail: 'controller/ProductController.php + model/Products.php' },
  //     { label: 'Admin add product', detail: 'views/admin/addProduct.php' },
  //     { label: 'Admin edit product', detail: 'views/admin/edit-product.php' },
  //     { label: 'Admin product list', detail: 'views/admin/main.php' },
  //     { label: 'Auth middleware', detail: 'middleware/auth.php protecting protected routes' },
  //     { label: 'Role middleware', detail: 'middleware/cheackRole.php gating admin access' },
  //     { label: 'Image handling', detail: 'public/image product photography' },
  //   ],
  //   stack: ['PHP', 'MySQL', 'MVC', 'CSS'],
  //   architecture: [
  //     'index.php — front controller',
  //     'controller/ — AuthController, ProductController',
  //     'model/Products.php — data access',
  //     'middleware/ — auth.php, cheackRole.php',
  //     'handle/ — Message, modal, Redirect helpers',
  //     'views/ — auth/, admin/, frontend/, components/',
  //     'sql.sql — users schema',
  //   ],
  //   language: 'PHP',
  //   updated: '2026-07-17',
  //   category: 'Backend',
  // },
  {
    repo: 'Finally-project',
    title: 'Multi-Category Fashion Store — Vue 3',
    tagline:
      'A Vue 3 storefront covering men, women and sport collections with responsive category browsing.',
    overview:
      'A Vue 3 storefront organised by collection. Men, women and sport each get their own product set and imagery, routed through vue-router, with Swiper for the merchandising strips and Tailwind CSS for the responsive layout.',
    problem:
      'A catalogue spanning several very different collections needs consistent navigation and imagery handling without duplicating page markup per category.',
    solution:
      'Use a single routed application shell with per-category views, keep product imagery in the asset pipeline under src/assets so Vite can optimise it, and standardise responsive behaviour with Tailwind utilities.',
    features: [
      { label: 'Per-category collections', detail: 'Men, Women and Sport product sets' },
      { label: 'Routed SPA', detail: 'Vue Router with a dedicated 404 route' },
      { label: 'Product imagery pipeline', detail: 'Vite-optimised assets in src/assets' },
      { label: 'Carousel merchandising', detail: 'Swiper integration' },
      { label: 'Responsive styling', detail: 'Tailwind CSS + PostCSS' },
      { label: 'Icon system', detail: '@fortawesome/fontawesome-free' },
    ],
    stack: ['Vue 3', 'Vue Router', 'Tailwind CSS', 'Swiper', 'Vite'],
    architecture: [
      'src/App.vue — root composition',
      'src/assets/Images — collection and product imagery',
      'src/assets/main.css — base styles',
      'src/404/NotFound.vue — not-found route',
    ],
    language: 'Vue',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://finally-project-bay.vercel.app',
  },
  {
    repo: 'Order-Food-Etec',
    title: 'Restaurant Ordering Frontend — Vue 3',
    tagline:
      'A restaurant ordering interface with menu browsing, a cart store and responsive merchandising banners.',
    overview:
      'A restaurant front end built on Vue 3 with Pinia state management. Menu and cart data live in typed JSON modules, layout components wrap each route, and a slider presents promotional banners across the top of the experience.',
    problem:
      'Restaurant menus change often, and hard-coding them inside components makes every price or dish update a code change.',
    solution:
      'Externalise the menu and cart seed data into dedicated JSON modules, drive ordering state with Pinia, and wrap every view in a shared layout so navigation stays consistent as the menu grows.',
    features: [
      { label: 'Menu browsing', detail: 'src/data/restaurantMenu.json' },
      { label: 'Cart state', detail: 'Pinia store seeded from src/data/homeCart.json' },
      { label: 'Shared layouts', detail: 'src/Layouts/LayoutMenu.vue' },
      { label: 'Promotional slider', detail: 'src/components/SlideBar.vue with Swiper' },
      { label: 'User feedback', detail: 'SweetAlert2 dialogs' },
      { label: 'Responsive styling', detail: 'Tailwind CSS + PostCSS' },
      { label: 'Icon set', detail: '@fortawesome/vue-fontawesome' },
    ],
    stack: ['Vue 3', 'Pinia', 'Tailwind CSS', 'Vue Router', 'SweetAlert2', 'Vite'],
    architecture: [
      'src/views — routed pages',
      'src/components — AppNavbar, SlideBar, Footer',
      'src/Layouts/LayoutMenu.vue — shared shell',
      'src/data — restaurantMenu.json, homeCart.json',
      'src/assets/image — banners and imagery',
    ],
    language: 'Vue',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://order-food-kappa-seven.vercel.app',
  },
  {
    repo: 'Library_System',
    title: 'Library Management System — Vue 3',
    tagline:
      'A library catalogue with book listing, detail views, search and a routed account area.',
    overview:
      'A Vue 3 library application. Books are browsed through a listing view and a dedicated detail route, catalogue data is kept in a JSON store module, and the interface is styled with Bootstrap for a clean, familiar result.',
    problem:
      'A physical library catalogue needs a fast way to find a book, confirm its details, and check availability without scrolling a long static page.',
    solution:
      'Split browsing and detail into separate routed views so a book can be linked and shared directly, keep catalogue data in a store module, and use Bootstrap for a proven responsive grid.',
    features: [
      { label: 'Book catalogue', detail: 'views/BooksView.vue' },
      { label: 'Book detail route', detail: 'views/BookDetail.vue' },
      { label: 'Routed account area', detail: 'views/auth/LoginView.vue' },
      { label: 'Catalogue data store', detail: 'src/data/store.json' },
      { label: 'Shared layout', detail: 'views/Layout/LayoutApp.vue' },
      { label: 'Responsive grid', detail: 'Bootstrap 5 utilities and components' },
      { label: 'Navigation shell', detail: 'AppNavBar and AppFooter components' },
    ],
    stack: ['Vue 3', 'Vue Router', 'Bootstrap', 'Vite'],
    architecture: [
      'src/views — Home, Books, BookDetail, auth, About',
      'src/components — AppNavBar, AppFooter',
      'src/views/Layout/LayoutApp.vue — shared shell',
      'src/data/store.json — catalogue data',
      'src/router/index.js — route table',
    ],
    language: 'Vue',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://library-system-wine.vercel.app',
  },
  // {
  //   repo: 'Rupp03',
  //   title: 'Developer CV — Static HTML/CSS',
  //   tagline:
  //     'A single-page résumé with contact details, skills, education and project experience, kept as one semantic HTML document.',
  //   overview:
  //     'A one-page curriculum vitae built as a standalone HTML document with inline CSS. It presents a header with contact links and a portrait, a skills line, education, and two project entries with responsibilities and technologies, followed by a footer. No framework, build step or JavaScript.',
  //   problem:
  //     'Sending a CV as a document makes it hard to link, preview or update quickly, and generic templates bury the relevant project work.',
  //   solution:
  //     'Keep the résumé as a single semantic HTML file with its styles inline, structure it with clear section headings, and link directly to the public GitHub profile so the recipient can verify the work.',
  //   features: [
  //     { label: 'Single-file résumé', detail: 'HTML document with inline CSS' },
  //     { label: 'Contact header', detail: 'GitHub link, location and email' },
  //     { label: 'Skills summary', detail: 'Languages, frameworks and tools' },
  //     { label: 'Education section', detail: 'Degree track and dates' },
  //     { label: 'Project experience', detail: 'D Shop and Airport PNH entries' },
  //     { label: 'Portrait asset', detail: 'image/profile.png' },
  //     { label: 'No dependencies', detail: 'No framework, build step or JavaScript' },
  //   ],
  //   stack: ['HTML', 'CSS'],
  //   architecture: [
  //     'index.html — markup and inline styles',
  //     'image/profile.png — portrait asset',
  //   ],
  //   language: 'HTML',
  //   updated: '2026-09-22',
  //   category: 'Learning',
  // },
  {
    repo: 'Java_OOP',
    title: 'Java OOP Foundations',
    tagline:
      'A structured Java practice suite covering encapsulation, inheritance, polymorphism, constructors and method overriding.',
    overview:
      'A collection of focused Java programs, each isolating one object-oriented concept. Every concept lives in its own package with an executable entry point, making the behaviour of each principle easy to run and compare side by side.',
    problem:
      'Reading about encapsulation, inheritance and polymorphism rarely sticks — the concepts only become clear when each one is demonstrated in isolation with runnable code.',
    solution:
      'Create a dedicated package per principle, keep each demo small and focused on a single idea, and give every demo an executable main class so the behaviour can be run and compared directly.',
    features: [
      { label: 'Encapsulation', detail: 'Encapsulation/User.java with getter / setter validation' },
      { label: 'Inheritance', detail: 'DemoInheritance — Animal, Human, Mamal, Reptile' },
      { label: 'Polymorphism', detail: 'Polymorphism — Animal, Dog, Fish with polymorphic dispatch' },
      { label: 'Method overriding', detail: 'DemoOverride — Cart, BirthdayCart' },
      { label: 'Constructors', detail: 'Contructor — Car, Car1, Car2' },
      { label: 'super keyword', detail: 'Super_keyword — Vehicle, Car' },
      { label: 'Runnable demos', detail: 'Every package includes an executable main class' },
    ],
    stack: ['Java', 'OOP'],
    architecture: [
      'src/Encapsulation — access control demo',
      'src/DemoInheritance — class hierarchy demo',
      'src/Polymorphism — runtime dispatch demo',
      'src/DemoOverride — method overriding demo',
      'src/Contructor — constructor variants',
      'src/Super_keyword — super usage',
      'src/DemoEmployyee — applied class example',
      'src/Example_Quiz — practice exercises',
      'src/Test — scratch and test classes',
    ],
    language: 'Java',
    updated: '2026-02-19',
    category: 'Learning',
  },
  {
    repo: 'Portfolio-',
    title: 'Developer Portfolio — Vue 3 + Tailwind v4',
    tagline:
      'A bilingual, accessible portfolio with live GitHub metadata, project case-study dialogs and a custom Tailwind v4 design system.',
    overview:
      'The site you are reading. Built with Vue 3, TypeScript, Vite and Tailwind v4, it presents verified repository data merged with live GitHub API metadata. A custom theme token layer drives the dark teal aesthetic, all copy is available in English and Khmer, and every project opens in an accessible detail dialog with a deep-linkable detail route.',
    problem:
      'A portfolio has to stay honest and current: project claims go stale, screenshots do not prove code, and a showcase that is itself inaccessible undermines the work it presents.',
    solution:
      'Keep a curated, repository-verified dataset with live GitHub metadata merged on top; render project details as focus-trapped dialogs and routed pages; centralise copy in EN / KH dictionaries; define the entire design system as Tailwind v4 theme tokens; and deliver contact messages through the Telegram Bot API.',
    features: [
      { label: 'Live GitHub metadata', detail: 'useGithubRepos.ts merges description, language, stars and last push over curated data' },
      { label: 'Verified project dataset', detail: 'src/data/projects.ts documented against actual repository files' },
      { label: 'Project detail dialog', detail: 'Focus trap, Escape handling, scroll lock and prev / next in ProjectDetailModal.vue' },
      { label: 'Routed case studies', detail: 'Deep links through ProjectDetailView.vue and the router' },
      { label: 'EN / KH localization', detail: 'src/data/i18n.ts with persisted locale and <html lang> sync' },
      { label: 'Tailwind v4 tokens', detail: 'Colours, radii and easing defined through @theme in src/assets/main.css' },
      { label: 'Scroll reveal', detail: 'IntersectionObserver in useReveal.ts, disabled under prefers-reduced-motion' },
      { label: 'Per-locale SEO', detail: 'useSeo.ts updates title and meta description' },
      { label: 'Contact delivery', detail: 'Validated form posts to the Telegram Bot API' },
      { label: 'Accessible navigation', detail: 'Skip link, focus-visible rings, mobile drawer and aria-current' },
      { label: 'Portrait pipeline', detail: 'Sharp script generates optimized WebP and JPEG variants' },
    ],
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vue Router', 'Lucide'],
    architecture: [
      'src/components/ — hero, skills, projects, services, experience, contact and shared UI',
      'src/composables/ — locale, SEO, reveal and live GitHub metadata',
      'src/data/ — projects, skills, services and EN / KH copy',
      'src/router/index.ts — home and project detail routes',
      'src/views/ — HomeView and ProjectDetailView',
      'src/assets/main.css — Tailwind v4 theme tokens and utilities',
      'scripts/optimize-portrait.mjs — Sharp image pipeline',
    ],
    language: 'Vue',
    updated: '2026-10-25',
    category: 'Frontend',
    liveUrl: 'https://portfolio708.vercel.app',
  },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]!
export const supportingProjects = projects.filter((p) => !p.featured)

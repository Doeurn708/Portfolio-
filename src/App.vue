<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import AmbientBackdrop from '@/components/AmbientBackdrop.vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <AmbientBackdrop />

  <a
    href="#main"
    class="pill sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:border focus:border-line-strong focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-[0.72rem] focus:tracking-[0.18em] focus:text-aqua-100 focus:uppercase"
  >
    {{ t('nav.skipToContent') }}
  </a>

  <Navbar />

  <main id="main" class="relative">
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <Footer />
</template>

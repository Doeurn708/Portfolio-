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
      <component :is="Component" />
    </RouterView>
  </main>

  <Footer />
</template>

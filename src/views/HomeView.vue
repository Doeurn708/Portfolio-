<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ContactSection from '@/components/ContactSection.vue'

useSeo()
</script>

<template>
  <HeroSection />
  <AboutSection />
  <SkillsSection />
  <ProjectsSection />
  <ServicesSection />
  <ExperienceSection />
  <ContactSection />
</template>

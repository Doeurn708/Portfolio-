<script setup lang="ts">
/** Shared section eyebrow + large display heading used across every section. */
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    accent?: string
    description?: string
    align?: 'left' | 'center'
    id?: string
  }>(),
  { accent: '', description: '', align: 'left' },
)
</script>

<template>
  <header
    class="reveal flex flex-col gap-5"
    :class="align === 'center' ? 'items-center text-center' : 'items-start'"
  >
    <p class="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.42em] text-primary uppercase">
      <span class="h-px w-8 bg-linear-to-r from-primary/0 to-primary" aria-hidden="true" />
      {{ eyebrow }}
    </p>

    <h2
      :id="id"
      class="text-[clamp(2.15rem,6.2vw,4.35rem)] leading-[0.98] font-semibold text-surface"
    >
      {{ title }}
      <span v-if="accent" class="text-gradient block">{{ accent }}</span>
    </h2>

    <p
      v-if="description"
      class="max-w-2xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </header>
</template>

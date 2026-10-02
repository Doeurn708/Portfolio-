<script setup lang="ts">
/** Rounded technology pill. Optionally flags a technology used in a public repo. */
withDefaults(
  defineProps<{
    label: string
    verified?: boolean
    size?: 'sm' | 'md'
  }>(),
  { verified: false, size: 'md' },
)
</script>

<template>
  <span
    class="pill border border-line bg-white/[0.02] text-muted hover:border-line-strong hover:bg-primary/8 hover:text-aqua-100"
    :class="size === 'sm' ? 'px-2.5 py-1 text-[0.68rem]' : 'px-3.5 py-1.5 text-[0.76rem]'"
  >
    <span
      v-if="verified"
      class="size-1.5 shrink-0 rounded-full bg-primary"
      aria-hidden="true"
    />
    <slot>{{ label }}</slot>
  </span>
</template>

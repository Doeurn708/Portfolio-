<script setup lang="ts">
/**
 * Full-viewport ambient backdrop: deep teal radial washes, blurred orbs,
 * a faint technical grid and a global grain layer. Purely decorative.
 */
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <!-- Base vertical wash -->
    <div
      class="absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_-10%,rgba(0,229,212,0.16),transparent_58%),radial-gradient(90%_70%_at_8%_8%,rgba(10,95,97,0.4),transparent_62%),linear-gradient(180deg,#020707_0%,#031111_45%,#020707_100%)]"
    />

    <!-- Technical grid, faded toward the centre -->
    <div
      class="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(85%_60%_at_50%_35%,#000,transparent_78%)]"
      style="
        background-image:
          linear-gradient(to right, rgba(0, 229, 212, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 229, 212, 0.16) 1px, transparent 1px);
        background-size: 76px 76px;
      "
    />

    <!-- Blurred decorative orbs -->
    <div
      class="glow-orb animate-float-slow top-[-14rem] -right-40 size-[38rem] bg-primary/14"
    />
    <div
      class="glow-orb animate-glow-breathe top-[22vh] -left-56 size-[34rem] bg-primary-soft/28"
    />
    <div
      class="glow-orb animate-float-slow bottom-[-18rem] left-1/3 size-[42rem] bg-primary/10"
      style="animation-delay: -6s"
    />
    <div
      class="glow-orb animate-glow-breathe top-[62vh] right-[8%] size-[22rem] bg-primary/12"
      style="animation-delay: -3s"
    />

    <!-- Organic dark shapes for depth -->
    <div
      class="absolute -top-40 left-[-10%] size-[46rem] rounded-[42%_58%_64%_36%/48%_38%_62%_52%] bg-ink-800/55 blur-3xl"
    />
    <div
      class="absolute bottom-[-24rem] right-[-12%] size-[52rem] rounded-[60%_40%_34%_66%/58%_52%_48%_42%] bg-ink-900/80 blur-3xl"
    />

    <!-- Hairline horizon glow -->
    <div
      class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent"
    />

    <!-- Grain -->
    <div class="grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
  </div>
</template>

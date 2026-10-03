<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-vue-next";
import { useLocale } from "@/composables/useLocale";
import imageWebp from "@/assets/image.webp";
import imageJpg from "@/assets/image.jpg";
import cvPdf from "@/assets/cv.pdf";

const { t } = useLocale();
const root = ref<HTMLElement | null>(null);

const headline = [
  { key: "hero.line1", accent: false },
  { key: "hero.line2", accent: true },
  { key: "hero.line3", accent: false },
];

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

onMounted(() => {
  // The hero is above the fold, so its reveal states resolve immediately
  // rather than waiting for an intersection callback.
  root.value
    ?.querySelectorAll<HTMLElement>(".reveal")
    .forEach((el) => el.classList.add("is-visible"));
});
</script>

<template>
  <section
    id="home"
    ref="root"
    class="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    aria-labelledby="hero-title"
  >
    <div class="container-x">
      <div
        class="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-16"
      >
        <!-- ============ Portrait (left) ============ -->
        <div class="order-2 lg:order-1">
          <div
            class="reveal relative mx-auto w-full max-w-[26rem] lg:max-w-none"
          >
            <!-- Organic backing shapes -->
            <div
              class="absolute -top-6 left-0 size-56 rounded-[46%_54%_38%_62%/52%_42%_58%_48%] border border-line bg-ink-800/40 blur-[2px] sm:-top-10 sm:-left-8 sm:size-80"
              aria-hidden="true"
            />
            <div
              class="absolute -right-4 -bottom-8 size-48 rounded-[62%_38%_54%_46%/42%_56%_44%_58%] bg-linear-to-br from-primary/18 via-primary-soft/24 to-transparent blur-2xl sm:-right-6 sm:-bottom-10 sm:size-64"
              aria-hidden="true"
            />

            <!-- Cyan glow behind portrait -->
            <div
              class="absolute inset-6 rounded-full bg-primary/22 blur-[70px]"
              aria-hidden="true"
            />

            <!-- Portrait frame: organic mask + thin cyan ring -->
            <div class="grain relative">
              <div
                class="relative aspect-4/5 w-full overflow-hidden rounded-[10rem_10rem_2.5rem_2.5rem] border border-line-strong bg-ink-900 shadow-[0_50px_120px_-50px_rgba(0,229,212,0.42)] sm:rounded-[14rem_14rem_3rem_3rem]"
              >
                <picture>
                  <source :srcset="imageWebp" type="image/webp" />
                  <img
                    :src="imageJpg"
                    :alt="t('hero.portraitAlt')"
                    width="900"
                    height="1158"
                    fetchpriority="high"
                    decoding="async"
                    class="size-full object-cover object-top opacity-90 contrast-[1.08] brightness-[0.86] grayscale-[0.55] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                  />
                </picture>
                <!-- Duotone + vignette treatment -->
                <div
                  class="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgba(0,229,212,0.22),transparent_45%,rgba(2,7,7,0.86))] mix-blend-color"
                  aria-hidden="true"
                />
                <div
                  class="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_18%,transparent,rgba(2,7,7,0.55)_78%,rgba(2,7,7,0.92))]"
                  aria-hidden="true"
                />
                <!-- Inner hairline -->
                <div
                  class="pointer-events-none absolute inset-3 rounded-[9rem_9rem_2rem_2rem] border border-white/6 sm:rounded-[13rem_13rem_2.5rem_2.5rem]"
                  aria-hidden="true"
                />
              </div>

              <!-- Floating role badge -->
              <div
                class="pill animate-float-slow absolute -bottom-4 left-1/2 -translate-x-1/2 border border-line-strong bg-ink-900/90 px-5 py-2.5 text-[0.66rem] font-semibold tracking-[0.22em] text-aqua-100 uppercase backdrop-blur-md"
              >
                <Sparkles
                  :size="13"
                  :stroke-width="1.7"
                  class="text-primary"
                  aria-hidden="true"
                />
                {{ t("hero.badgeRole") }}
              </div>
            </div>
          </div>
        </div>

        <!-- ============ Copy (right) ============ -->
        <div class="order-1 flex flex-col items-start lg:order-2">
          <!-- Eyebrow -->
          <p
            class="reveal pill border border-line bg-primary/8 px-4 py-2 text-[0.64rem] font-semibold tracking-[0.34em] text-aqua-200 uppercase"
            :style="{ '--reveal-delay': '60ms' }"
          >
            {{ t("hero.eyebrow") }}
          </p>

          <!-- Headline -->
          <h1
            id="hero-title"
            class="reveal mt-7 text-[clamp(2.6rem,8.2vw,5.6rem)] leading-[0.94] font-semibold tracking-[-0.04em] text-surface"
            :style="{ '--reveal-delay': '140ms' }"
          >
            <span
              v-for="(line, index) in headline"
              :key="line.key"
              class="block overflow-hidden"
            >
              <span
                class="block"
                :class="line.accent ? 'text-gradient' : ''"
                :style="{
                  animation: `fade-rise 0.95s var(--ease-out-expo) ${220 + index * 110}ms both`,
                }"
              >
                {{ t(line.key) }}
              </span>
            </span>
          </h1>

          <!-- Supporting alternative headline -->
          <p
            class="reveal mt-6 max-w-xl text-[0.95rem] leading-relaxed text-aqua-100/70 sm:text-[1.02rem]"
            :style="{ '--reveal-delay': '300ms' }"
          >
            {{ t("hero.alt") }}
          </p>

          <!-- Description -->
          <p
            class="reveal mt-4 max-w-xl text-[0.92rem] leading-[1.75] text-muted sm:text-[0.98rem]"
            :style="{ '--reveal-delay': '360ms' }"
          >
            {{ t("hero.description") }}
          </p>

          <!-- CTAs -->
          <div
            class="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            :style="{ '--reveal-delay': '440ms' }"
          >
            <a
              :href="cvPdf"
              download="Chorm chandoeurn-CV.pdf"
              class="pill group relative overflow-hidden border border-primary bg-primary px-7 py-4 text-[0.74rem] font-semibold tracking-[0.18em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_26px_70px_-24px_rgba(0,229,212,0.7)]"
            >
              <span
                class="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span class="relative">Download CV</span>
              <ArrowRight
                :size="15"
                :stroke-width="2"
                class="relative transition-transform duration-400 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              class="pill group border border-line bg-white/2 px-7 py-4 text-[0.74rem] font-semibold tracking-[0.18em] text-surface uppercase hover:border-line-strong hover:bg-primary/8 hover:shadow-glow"
              @click="scrollTo('work')"
            >
              {{ t("hero.ctaPrimary") }}
            </button>
          </div>

          <!-- Availability + scroll cue -->
          <div
            class="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            :style="{ '--reveal-delay': '520ms' }"
          >
            <p class="flex items-center gap-2.5 text-[0.78rem] text-muted">
              <span
                class="animate-pulse-dot size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              {{ t("hero.available") }}
            </p>

            <button
              type="button"
              class="group flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.24em] text-muted uppercase hover:text-aqua-200"
              @click="scrollTo('about')"
            >
              {{ t("hero.scroll") }}
              <ArrowDown
                :size="13"
                :stroke-width="1.8"
                class="animate-bounce transition-transform duration-400 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Faint edge glow -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(0,229,212,0.09),transparent_72%)]"
      aria-hidden="true"
    />
  </section>
</template>

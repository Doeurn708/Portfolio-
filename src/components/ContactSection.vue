<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-vue-next'
import { profile } from '@/data/projects'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()
const root = ref<HTMLElement | null>(null)
useReveal(root)

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const form = ref<FormState>({ name: '', email: '', subject: '', message: '' })
const errors = ref<Partial<Record<keyof FormState, string>>>({})
const notice = ref('')
const copied = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const channels = computed(() => [
  { key: 'contact.github', href: profile.github, icon: Github, handle: 'github.com/Doeurn708' },
  { key: 'contact.email', href: `mailto:${profile.email}`, icon: Mail, handle: profile.email },
  { key: 'contact.telegram', href: profile.telegram, icon: Send, handle: 't.me/Doeurn708' },
  { key: 'contact.linkedin', href: profile.linkedin, icon: Linkedin, handle: 'linkedin.com/in/Doeurn708' },
])

function validate(): boolean {
  const next: Partial<Record<keyof FormState, string>> = {}
  if (!form.value.name.trim()) next.name = t('contact.errorName')
  if (!emailPattern.test(form.value.email.trim())) next.email = t('contact.invalidEmail')
  if (!form.value.subject.trim()) next.subject = t('contact.errorSubject')
  if (form.value.message.trim().length < 10) next.message = t('contact.errorMessage')
  errors.value = next
  return Object.keys(next).length === 0
}

function submit() {
  notice.value = ''
  if (!validate()) return

  const subject = `[Portfolio] ${form.value.subject.trim()} — ${form.value.name.trim()}`
  const body = `${form.value.message.trim()}\n\n—\n${form.value.name.trim()}\n${form.value.email.trim()}`
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  notice.value = t('contact.success')
  window.location.href = href
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard unavailable (insecure context) — the email button still works.
  }
}
</script>

<template>
  <section
    id="contact"
    ref="root"
    class="relative scroll-mt-28 py-24 sm:py-32 lg:py-40"
    aria-labelledby="contact-title"
  >
    <!-- Section glow -->
    <div
      class="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[36rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(0,229,212,0.09),transparent_70%)]"
      aria-hidden="true"
    />

    <div class="container-x">
      <SectionHeading
        id="contact-title"
        :eyebrow="t('contact.eyebrow')"
        :title="t('contact.line1')"
        :accent="t('contact.line2')"
        :description="t('contact.description')"
      />

      <div class="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <!-- Channels -->
        <div class="reveal flex flex-col gap-4">
          <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <li v-for="channel in channels" :key="channel.key">
              <a
                :href="channel.href"
                :target="channel.href.startsWith('mailto:') ? undefined : '_blank'"
                rel="noopener noreferrer"
                class="group flex items-center gap-4 rounded-[1.35rem] border border-line bg-ink-900/50 px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong hover:bg-ink-850/60 hover:shadow-glow"
              >
                <span
                  class="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-primary/8 text-primary"
                  aria-hidden="true"
                >
                  <component :is="channel.icon" :size="16" :stroke-width="1.7" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-[0.82rem] font-semibold text-surface">{{ t(channel.key) }}</span>
                  <span class="block truncate font-mono text-[0.72rem] text-muted-dim">
                    {{ channel.handle }}
                  </span>
                </span>
                <ArrowUpRight
                  :size="15"
                  :stroke-width="1.8"
                  class="shrink-0 text-muted-dim transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>

          <button
            type="button"
            class="pill self-start border border-line bg-white/[0.02] px-5 py-3 text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase hover:border-line-strong hover:text-primary"
            @click="copyEmail"
          >
            <Check v-if="copied" :size="13" :stroke-width="2" aria-hidden="true" />
            <Copy v-else :size="13" :stroke-width="1.8" aria-hidden="true" />
            {{ copied ? t('contact.copied') : t('contact.copy') }}
          </button>

          <p class="text-[0.76rem] text-muted-dim">{{ t('contact.responseTime') }}</p>
        </div>

        <!-- Form -->
        <form
          class="reveal panel-solid flex flex-col gap-5 rounded-[1.85rem] p-6 sm:p-8"
          novalidate
          @submit.prevent="submit"
        >
          <div>
            <h3 class="text-[1.1rem] font-semibold text-surface">{{ t('contact.formTitle') }}</h3>
            <p class="mt-2 text-[0.85rem] leading-relaxed text-muted/85">
              {{ t('contact.formDescription') }}
            </p>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label
                for="contact-name"
                class="flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase"
              >
                {{ t('contact.name') }}
                <span class="text-primary/60 normal-case">{{ t('contact.required') }}</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                :placeholder="t('contact.namePlaceholder')"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                class="w-full rounded-2xl border bg-ink-950/60 px-4 py-3.5 text-[0.9rem] text-surface transition-colors duration-300 placeholder:text-muted-dim/70 focus:border-line-strong focus:outline-none"
                :class="errors.name ? 'border-red-400/60' : 'border-line'"
              />
              <p
                v-if="errors.name"
                id="contact-name-error"
                class="text-[0.72rem] text-red-300/90"
                role="alert"
              >
                {{ errors.name }}
              </p>
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="contact-email"
                class="flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase"
              >
                {{ t('contact.emailField') }}
                <span class="text-primary/60 normal-case">{{ t('contact.required') }}</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :placeholder="t('contact.emailPlaceholder')"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                class="w-full rounded-2xl border bg-ink-950/60 px-4 py-3.5 text-[0.9rem] text-surface transition-colors duration-300 placeholder:text-muted-dim/70 focus:border-line-strong focus:outline-none"
                :class="errors.email ? 'border-red-400/60' : 'border-line'"
              />
              <p
                v-if="errors.email"
                id="contact-email-error"
                class="text-[0.72rem] text-red-300/90"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="contact-subject"
              class="flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase"
            >
              {{ t('contact.subject') }}
              <span class="text-primary/60 normal-case">{{ t('contact.required') }}</span>
            </label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              name="subject"
              required
              :placeholder="t('contact.subjectPlaceholder')"
              :aria-invalid="Boolean(errors.subject)"
              :aria-describedby="errors.subject ? 'contact-subject-error' : undefined"
              class="w-full rounded-2xl border bg-ink-950/60 px-4 py-3.5 text-[0.9rem] text-surface transition-colors duration-300 placeholder:text-muted-dim/70 focus:border-line-strong focus:outline-none"
              :class="errors.subject ? 'border-red-400/60' : 'border-line'"
            />
            <p
              v-if="errors.subject"
              id="contact-subject-error"
              class="text-[0.72rem] text-red-300/90"
              role="alert"
            >
              {{ errors.subject }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="contact-message"
              class="flex items-center justify-between text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase"
            >
              {{ t('contact.message') }}
              <span class="text-primary/60 normal-case">{{ t('contact.required') }}</span>
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              name="message"
              rows="5"
              required
              :placeholder="t('contact.messagePlaceholder')"
              :aria-invalid="Boolean(errors.message)"
              :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              class="w-full resize-y rounded-2xl border bg-ink-950/60 px-4 py-3.5 text-[0.9rem] leading-relaxed text-surface transition-colors duration-300 placeholder:text-muted-dim/70 focus:border-line-strong focus:outline-none"
              :class="errors.message ? 'border-red-400/60' : 'border-line'"
            />
            <p
              v-if="errors.message"
              id="contact-message-error"
              class="text-[0.72rem] text-red-300/90"
              role="alert"
            >
              {{ errors.message }}
            </p>
          </div>

          <p
            v-if="notice"
            class="flex items-center gap-2 rounded-2xl border border-primary/35 bg-primary/8 px-4 py-3 text-[0.8rem] text-aqua-100"
            role="status"
          >
            <Check :size="14" :stroke-width="2" aria-hidden="true" />
            {{ notice }}
          </p>

          <button
            type="submit"
            class="pill group mt-1 border border-primary bg-primary px-7 py-4 text-[0.72rem] font-semibold tracking-[0.18em] text-ink-950 uppercase hover:shadow-[0_0_0_1px_rgba(0,229,212,0.5),0_26px_70px_-24px_rgba(0,229,212,0.7)]"
          >
            {{ t('contact.submit') }}
            <Send
              :size="15"
              :stroke-width="2"
              class="transition-transform duration-400 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

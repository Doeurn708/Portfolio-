import puppeteer from 'puppeteer-core'

const CHROME =
  process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = process.env.BASE_URL || 'http://localhost:4173'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const problems = []
const page = await browser.newPage()

page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    problems.push(`[${msg.type()}] ${msg.text()}`)
  }
})
page.on('pageerror', (err) => problems.push(`[pageerror] ${err.message}`))
page.on('requestfailed', (req) => {
  const url = req.url()
  if (url.includes('fonts.googleapis') || url.includes('fonts.gstatic') || url.includes('api.github.com')) return
  problems.push(`[requestfailed] ${url} — ${req.failure()?.errorText}`)
})

async function viewports() {
  return [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 834, height: 1112 },
    { name: 'mobile', width: 390, height: 844 },
  ]
}

for (const vp of await viewports()) {
  problems.length = 0
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 })
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 45000 })
  await new Promise((r) => setTimeout(r, 900))

  // Horizontal overflow check
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement
    const offenders = []
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0) continue
      if (rect.right > doc.clientWidth + 2 || rect.left < -2) {
        const style = getComputedStyle(el)
        if (style.position === 'fixed') continue
        offenders.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(rect.right)}`)
      }
    }
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      offenders: offenders.slice(0, 5),
    }
  })

  // Structural checks
  const checks = await page.evaluate(() => {
    const q = (s) => document.querySelectorAll(s).length
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'))
    return {
      sections: ['home', 'about', 'skills', 'work', 'services', 'contact'].filter(
        (id) => document.getElementById(id),
      ),
      h1: q('h1'),
      h2: q('h2'),
      imagesWithoutAlt: Array.from(document.images).filter((i) => !i.alt).length,
      imagesBroken: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length,
      buttons: q('button'),
      deadAnchors: anchors.filter((a) => {
        const id = a.getAttribute('href')?.slice(1)
        return id ? !document.getElementById(id) : false
      }).length,
      githubLinks: Array.from(document.querySelectorAll('a[href*="github.com/Doeurn708"]')).length,
      buttonsWithoutLabel: Array.from(document.querySelectorAll('button')).filter(
        (b) => !b.textContent?.trim() && !b.getAttribute('aria-label'),
      ).length,
    }
  })

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`)
  console.log('sections:', checks.sections.join(', '))
  console.log(`h1=${checks.h1} h2=${checks.h2} buttons=${checks.buttons} githubLinks=${checks.githubLinks}`)
  console.log(
    `img: alt-missing=${checks.imagesWithoutAlt} broken=${checks.imagesBroken} | deadHashAnchors=${checks.deadAnchors} | unlabeledButtons=${checks.buttonsWithoutLabel}`,
  )
  console.log(
    `overflow: scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}` +
      (overflow.offenders.length ? `\n  offenders: ${overflow.offenders.join('\n  ')}` : ''),
  )

  if (problems.length) {
    console.log(`CONSOLE ISSUES (${problems.length}):`)
    for (const p of [...new Set(problems)].slice(0, 12)) console.log('  ' + p)
  } else {
    console.log('console: clean')
  }

  // ---- interaction tests on the largest viewport ----
  if (vp.name === 'desktop') {
    // Open project modal
    await page.evaluate(() => document.getElementById('work')?.scrollIntoView())
    await new Promise((r) => setTimeout(r, 700))
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        /view project/i.test(b.textContent || ''),
      )
      btn?.click()
    })
    await new Promise((r) => setTimeout(r, 800))
    const modal = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"]')
      if (!d) return null
      return {
        title: d.querySelector('h2')?.textContent?.trim(),
        repoLinks: Array.from(d.querySelectorAll('a[href*="github.com"]')).map((a) => a.getAttribute('href')),
        features: d.querySelectorAll('li').length,
        overflowLocked: document.documentElement.style.overflow === 'hidden',
      }
    })
    console.log('modal:', JSON.stringify(modal, null, 2))

    // Escape closes
    await page.keyboard.press('Escape')
    await new Promise((r) => setTimeout(r, 500))
    console.log('modal closed on Escape:', await page.evaluate(() => !document.querySelector('[role="dialog"]')))

    // Language switch — click the KH button specifically
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((r) => setTimeout(r, 400))
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.textContent?.trim() === 'KH',
      )
      btn?.click()
    })
    await new Promise((r) => setTimeout(r, 500))
    console.log(
      'locale after switching to KH:',
      await page.evaluate(() => ({
        lang: document.documentElement.lang,
        dataLocale: document.documentElement.dataset.locale,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content?.slice(0, 40),
        h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
      })),
    )

    // Switch back to EN
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.textContent?.trim() === 'EN',
      )
      btn?.click()
    })
    await new Promise((r) => setTimeout(r, 400))
    console.log(
      'locale back to EN:',
      await page.evaluate(() => ({
        lang: document.documentElement.lang,
        h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
      })),
    )

    // Contact form validation
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView())
    await new Promise((r) => setTimeout(r, 500))
    await page.evaluate(() => {
      document.querySelector('form button[type="submit"]')?.click()
    })
    await new Promise((r) => setTimeout(r, 300))
    console.log(
      'form errors on empty submit:',
      await page.evaluate(() => document.querySelectorAll('form [role="alert"]').length),
    )

    // Mobile drawer
    await page.setViewport({ width: 390, height: 844 })
    await new Promise((r) => setTimeout(r, 400))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.evaluate(() => {
      document.querySelector('[aria-controls="mobile-nav"]')?.click()
    })
    await new Promise((r) => setTimeout(r, 600))
    console.log(
      'mobile drawer:',
      await page.evaluate(() => ({
        open: Boolean(document.getElementById('mobile-nav')),
        links: document.querySelectorAll('#mobile-nav a').length,
        scrollLocked: document.documentElement.style.overflow === 'hidden',
      })),
    )
  }
}

await browser.close()

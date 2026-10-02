import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

/**
 * Optimises the hero portrait for fast loading.
 *
 * Source of truth: src/assets/image.png (the original uploaded photo).
 * Outputs:         src/assets/image.webp + src/assets/image.jpg
 *
 * Run with: npm run optimize:portrait
 */
const source = fileURLToPath(new URL('../src/assets/image.png', import.meta.url))
const outDir = fileURLToPath(new URL('../src/assets/', import.meta.url))

await mkdir(outDir, { recursive: true })

const { width, height } = await sharp(source).metadata()
console.log(`source: ${width}x${height}`)

await sharp(source)
  .resize({ width: 900, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(join(outDir, 'image.webp'))

await sharp(source)
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(join(outDir, 'image.jpg'))

console.log('wrote image.webp and image.jpg')

/**
 * Post-build: write dist/index.md for Accept: text/markdown negotiation
 * and patch x-markdown-tokens in vercel.json.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildPortfolioMarkdown,
  estimateMarkdownTokens,
} from '../src/content/portfolio-markdown.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const vercelPath = path.join(root, 'vercel.json')

function patchMarkdownTokens(tokens: number) {
  if (!existsSync(vercelPath)) return

  const vercel = JSON.parse(readFileSync(vercelPath, 'utf8')) as {
    routes?: Array<{ headers?: Record<string, string> }>
    headers?: Array<{
      source: string
      headers: Array<{ key: string; value: string }>
    }>
  }

  for (const route of vercel.routes ?? []) {
    if (route.headers && 'x-markdown-tokens' in route.headers) {
      route.headers['x-markdown-tokens'] = String(tokens)
    }
  }

  for (const block of vercel.headers ?? []) {
    for (const header of block.headers) {
      if (header.key.toLowerCase() === 'x-markdown-tokens') {
        header.value = String(tokens)
      }
    }
  }

  writeFileSync(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`, 'utf8')
}

function main() {
  if (!existsSync(distDir)) {
    throw new Error('dist/ not found — run vite build first')
  }

  const markdown = buildPortfolioMarkdown()
  const tokens = estimateMarkdownTokens(markdown)

  writeFileSync(path.join(distDir, 'index.md'), markdown, 'utf8')
  writeFileSync(path.join(distDir, 'index.md.tokens'), String(tokens), 'utf8')
  patchMarkdownTokens(tokens)

  console.log(
    `Wrote dist/index.md (${markdown.length} bytes, ~${tokens} tokens)`
  )
}

main()

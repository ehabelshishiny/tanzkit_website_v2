#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { ContentMap } from './content-ops.js'
import { getWorkspaceRoot } from './env.js'
import { validateContentMapWithSanity } from './sanity.js'

async function main() {
  const inputPath = process.argv[2] || 'content/planning/homepage.sample.en-ar.json'
  const filePath = path.isAbsolute(inputPath)
    ? inputPath
    : path.join(getWorkspaceRoot(), inputPath)
  const source = await readFile(filePath, 'utf8')
  const result = await validateContentMapWithSanity(JSON.parse(source) as ContentMap)
  console.log(JSON.stringify(result, null, 2))

  if (!result.valid) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

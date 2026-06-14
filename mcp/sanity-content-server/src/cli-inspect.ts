#!/usr/bin/env node
import { inspectWebsiteCmsQueries } from './inspect.js'

async function main() {
  const result = await inspectWebsiteCmsQueries()
  console.log(JSON.stringify(result, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

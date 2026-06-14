import test from 'node:test'
import assert from 'node:assert/strict'

import { readCurrentPageContent } from '../src/sanity.js'

test('readCurrentPageContent with includeDraft false returns published singleton documents', async () => {
  const home = await readCurrentPageContent({
    pageKey: 'homepage',
    includeDraft: false,
  })
  const solutions = await readCurrentPageContent({
    pageKey: 'solutions',
    includeDraft: false,
  })

  assert.equal(home?._id, 'homePage')
  assert.equal(solutions?._id, 'solutionsPage')
})

test('readCurrentPageContent with includeDraft true returns draft singleton documents when present', async () => {
  const home = await readCurrentPageContent({
    pageKey: 'homepage',
    includeDraft: true,
  })
  const solutions = await readCurrentPageContent({
    pageKey: 'solutions',
    includeDraft: true,
  })

  assert.equal(home?._id, 'drafts.homePage')
  assert.equal(solutions?._id, 'drafts.solutionsPage')
})

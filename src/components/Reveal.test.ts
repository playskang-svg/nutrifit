import { expect, test } from 'vitest'

import { startReveal } from './Reveal'

const fakeElement = () => {
  const classes = new Set<string>()
  return {
    classes,
    classList: { add: (name: string) => classes.add(name) },
    matches: () => true,
    getBoundingClientRect: () => ({ top: 5000 }),
  }
}

test('reduced motion: every target is shown at once and nothing gets hidden', () => {
  const targets = [fakeElement(), fakeElement()]
  const dataset: Record<string, string> = {}
  const doc = { querySelectorAll: () => targets, documentElement: { dataset } } as unknown as Document
  const win = { matchMedia: () => ({ matches: true }), innerHeight: 800 } as unknown as Window
  startReveal(doc, win)
  expect(targets.every((el) => el.classes.has('is-in'))).toBe(true)
  expect(dataset.reveal).toBeUndefined()
})

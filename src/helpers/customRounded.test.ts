import customRounded from '@/helpers/customRounded'

import { test, expect } from 'vitest'

test('integer', () => {
  expect(customRounded(0)).toBe(0)
  expect(customRounded(100)).toBe(100)
})

test('high accuracy', () => {
  expect(customRounded(0.0001222)).toBe(0.00012)
  expect(customRounded(0.0001299)).toBe(0.00013)
})

test('standart accuracy', () => {
  expect(customRounded(0.2345)).toBe(0.2)
  expect(customRounded(0.299)).toBe(0.3)
})

import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import BaseButton from '@/components/BaseButton.vue'

it('renders with text', () => {
  const text = 'button text'
  render(BaseButton, {
    slots: {
      default: text,
    },
  })

  expect(screen.queryByText(text)).toBeDefined()
})

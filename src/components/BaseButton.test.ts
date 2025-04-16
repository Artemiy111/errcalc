import BaseButton from '@/components/BaseButton.vue'
import { render, screen } from '@testing-library/vue'
import { expect, it } from 'vitest'

it('renders with text', () => {
  const text = 'button text'
  render(BaseButton, {
    slots: {
      default: text,
    },
  })

  expect(screen.queryByText(text)).toBeDefined()
})

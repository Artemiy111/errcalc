import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import InputData from './InputData.vue'

describe('InputData', () => {
  it('contains add-button', async () => {
    render(InputData, {
      props: {
        modelValue: [],
      },
    })
    const addButton = screen.getByText('Добавить')
  })
})

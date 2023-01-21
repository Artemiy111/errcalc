import { render, screen } from '@testing-library/vue'
import { describe, it } from 'vitest'
import InputData from './InputData.vue'

describe('InputData', () => {
  it('contains add-button', async () => {
    render(InputData, {
      props: {
        modelValue: [],
      },
    })
    screen.getByText('Добавить')
  })
})

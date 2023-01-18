import { Ref, unref } from 'vue'

export default (number: number | Ref<number>): number => {
  number = unref(number)
  const parts = number.toString().split('.')

  if (parts.length === 1) return number

  let count = 0
  let isHighAccuracy = false
  for (const char of parts[1]) {
    if (isHighAccuracy) {
      count++
      break
    }
    if (char === '0') {
      count++
    } else if (char === '1') {
      isHighAccuracy = true
      count++
    } else {
      count++
      break
    }
  }

  return +number.toFixed(count)
}

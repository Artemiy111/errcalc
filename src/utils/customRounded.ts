import { Ref, unref } from 'vue'

export const customRounded = (number: number | Ref<number>): number => {
  number = unref(number)
  const array = number.toString().split('.')
  let resString = array[0] + '.'

  if (array.length === 1) return number

  let isAccurate = false
  for (const char of array[1]) {
    if (isAccurate) {
      resString += char
      break
    }

    if (char === '0') resString += char
    else if (char === '1') {
      isAccurate = true
      resString += char
    } else {
      resString += char
      break
    }
  }

  return +resString
}

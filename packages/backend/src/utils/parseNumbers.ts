export const parseNumbers = (numbers: number[]): string => {
  if (numbers.length !== 5 || numbers.some(n => n < 1 || n > 100)) {
    throw new Error('Invalid numbers')
  }
  return numbers.map(n => {
    if (n < 10) {
      return `0${n}`
    }
    if (n === 100) {
      return '00'
    }
    return `${n}`
  }).join(',')
}

export const parseNumbersString = (numbersString: string): number[] => {
  const numbers = numbersString.split(',').map(n => parseInt(n))
  if (numbers.length !== 5 || numbers.some(n => n < 1 || n > 100)) {
    throw new Error('Invalid numbers')
  }
  return numbers
}
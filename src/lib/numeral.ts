import numeral from 'numeral'
//
// export const numeralFormat = (value: number) => {
//   return numeral(value).format(0, 0)
// }

//
export const decimalNumber = (val: number, digit: number | string) => {
  if (!digit) digit = 0
  else digit = Number(digit)
  //
  let formatNumber = '0,0'
  switch (digit) {
    case 1:
      formatNumber = '0,0.0'
      break
    case 2:
      formatNumber = '0,0.00'
      break
    case 3:
      formatNumber = '0,0.00[0]'
      break
    case 4:
      formatNumber = '0,0.00[00]'
      break
    case 5:
      formatNumber = '0,0.00[000]'
      break
    case 6:
      formatNumber = '0,0.00[0000]'
      break
    default:
      formatNumber = '0,0'
  }

  return numeral(val).format(formatNumber)
}

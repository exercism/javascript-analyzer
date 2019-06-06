export function getResistorValue(bandColorOne, bandColorTwo) {
  const bandColorValues = {
    black: 0, 
    brown: 1, 
    red: 2, 
    orange: 3, 
    yellow: 4, 
    green: 5, 
    blue: 6, 
    violet: 7, 
    grey: 8, 
    white: 9
  }
  let bandColorOneValue = bandColorValues[bandColorOne]
  let bandColorTwoValue = bandColorValues[bandColorTwo]

  if (isNaN(bandColorOneValue) || isNaN(bandColorTwoValue))
    return 'Unable to match the provided colors.'
  
  let resistorValue = +`${bandColorOneValue}${bandColorTwoValue}`
  return resistorValue
}
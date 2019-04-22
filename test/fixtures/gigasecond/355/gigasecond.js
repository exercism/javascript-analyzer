export const gigasecond = (inputDate) => {

  const gigaSecond = Math.pow(10,9)

  inputDate.setUTCSeconds(inputDate.getSeconds() + gigaSecond) 

  return inputDate

}
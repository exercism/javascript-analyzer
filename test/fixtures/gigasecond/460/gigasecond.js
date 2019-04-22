export function gigasecond(date) {
  if(!date instanceof Date) {
    console.error('this function requires a Date object')
    return false
  } else {
    let gs = date.getTime() + 10**12
    console.log(date.getTime())
    return new Date(gs)
  }
}
const gigamilliseconds = 1e12

export function gigasecond(date){

  return new Date(date.getTime()+ gigamilliseconds)
}

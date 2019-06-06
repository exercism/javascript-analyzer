export const value = (arr) => {
  const num_one = arr[0].toLowerCase()
  const num_two = arr[1].toLowerCase()
  let key = {
    "black": 0,
    "brown": 1,
    "red": 2,
    "orange": 3,
    "yellow": 4,
    "green": 5,
    "blue": 6,
    "violet": 7,
    "grey": 8,
    "white": 9
  }
  return +`${key[num_one]}${key[num_two]}`
}
export const COLORS = {
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

export const value = (resistors) => {
  let sum = ''
  resistors.forEach(resistor => {
    sum += COLORS[resistor].toString()
  });
  return parseInt(sum)
}
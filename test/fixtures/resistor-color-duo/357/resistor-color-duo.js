export const value = (something) => parseInt(colorsMap[something[0]].toString().concat(colorsMap[something[1]].toString()))
const colorsMap = {
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

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

const colorMap = {
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

export const colorCode = (color) => {
  if(!color || colorMap[color] === undefined){
    throw new Error(`Please provide one of these color [${COLORS}]`)
  } 
  return colorMap[color]
}
import { decodedValue } from './resistor-colors.js';

const ColorArray = ["Black", "Brown", "Red", "Orange", "Yellow",
"Green", "Blue", "Violet", "Grey", "White"]


const ResistorColors = (color1, color2) => {
  return ColorArray.indexOf(color1).toString() + ColorArray.indexOf(color2).toString()
}


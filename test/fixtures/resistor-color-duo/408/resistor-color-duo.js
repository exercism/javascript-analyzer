import { colorCode } from '../resistor-color/resistor-color';

export const decodedValue = (colors) => {
  var colorValues = colorValue(colors[0]) + colorValue(colors[1]);
  return parseInt(colorValues);
}

const colorValue = (color) => {
  return colorCode(color).toString();
}

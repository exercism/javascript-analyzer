// import function from precedent exercise
import { colorCode } from "../resistor-color/resistor-color";

export const decodedValue = colors => {
  return colors.reduce((a, color) => a * 10 + colorCode(color), 0);
};

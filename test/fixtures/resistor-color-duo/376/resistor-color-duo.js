import { colorCode } from '../resistor-color/resistor-color.js';

export const decodedValue = ([color1, color2]) => colorCode(color1) * 10 + colorCode(color2)

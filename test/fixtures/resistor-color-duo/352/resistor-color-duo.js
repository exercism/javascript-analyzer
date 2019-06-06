import { colorCode } from '../resistor-color/resistor-color.js';

export const value = (colors) => parseInt(colors.map(arg => colorCode(arg)).filter(code => code > -1).join(''))
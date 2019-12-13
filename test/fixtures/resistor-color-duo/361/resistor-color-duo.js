import { colorCode } from './resistor-color.js';

export const decodedValue = (colors) => parseInt(colors.map(color => colorCode(color)).join(''), 10);

import { colorCode } from './resistor-color.js';

export const value = (colors) => parseInt(colors.map(color => colorCode(color)).join(''), 10);

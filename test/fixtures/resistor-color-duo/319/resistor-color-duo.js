import { colorCode } from '../resistor-color/resistor-color';

export const decodedValue = ([a, b]) => parseInt(`${colorCode(a)}${colorCode(b)}`, 10);

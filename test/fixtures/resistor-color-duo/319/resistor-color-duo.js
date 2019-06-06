import { colorCode } from '../resistor-color/resistor-color';

export const value = ([a, b]) => parseInt(`${colorCode(a)}${colorCode(b)}`, 10);

import { colorCode } from '../resistor-color/resistor-color';

export const value = (input) => {
    let output = '';
    input.forEach(function(element) {
        output += colorCode(element);
    });
    return Number(output);
}
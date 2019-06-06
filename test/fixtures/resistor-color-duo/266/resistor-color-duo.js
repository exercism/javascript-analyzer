//Author: Manan Shah
//Date: 29/4/19
//Problem: Resistor Color Duo

export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = (bands) => {
    return parseInt(`${COLORS.indexOf(bands[0])}${COLORS.indexOf(bands[1])}`);
}
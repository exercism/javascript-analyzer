const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const decodedValue = colors => Number(colors.map(color => COLORS.indexOf(color)).join(''));

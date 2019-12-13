export const decodedValue = (arr) => parseInt(arr.map(color => COLORS.indexOf(color)).join(""));

const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]


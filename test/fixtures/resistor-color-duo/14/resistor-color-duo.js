const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const colorCode = (code) => COLORS.indexOf(code);

export const decodedValue = (codeList) => codeList.reduce((acc, code) => acc * 10 + colorCode(code), 0);

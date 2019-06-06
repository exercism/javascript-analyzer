export { value };

const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const value = (colors = []) => colors.map(c => COLORS.indexOf(c)).reduce((pVal, cVal) => Number(pVal + '' + cVal));
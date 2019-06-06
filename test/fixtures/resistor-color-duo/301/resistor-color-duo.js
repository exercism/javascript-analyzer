const COLORS = ["black","brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const value = (colorArr) => {
    return +`${COLORS.indexOf(colorArr[0])}${COLORS.indexOf(colorArr[1])}`;
};

export { value, COLORS };
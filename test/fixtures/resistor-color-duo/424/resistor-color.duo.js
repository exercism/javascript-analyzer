const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const decodedValue = (bandArray) => {
    return parseInt(colors.indexOf(bandArray[0]).toString()
        .concat(colors.indexOf(bandArray[1]).toString()));
}

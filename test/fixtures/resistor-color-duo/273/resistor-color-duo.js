export const decodedValue = (colors) => {
    let resistorValueAsString = "";
    colors.forEach(color => {
        resistorValueAsString += COLORS.indexOf(color).toString();
    });

    return parseInt(resistorValueAsString);
}

export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

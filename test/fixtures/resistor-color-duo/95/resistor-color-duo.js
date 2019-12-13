const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const decodedValue = (arr) => {
    let result = '';

    arr.forEach(color => {
        result = result + COLORS.indexOf(color.toLowerCase());
    });

    return Number.parseInt(result);
}

const COLORS = ["black",
                "brown",
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "violet",
                "grey",
                "white"];

export const value = (bands) => {
    let result = '';
    for (let i = 0; i < bands.length; i++) {
        result = result + COLORS.indexOf(bands[i]);
    }
    return Number(result);
};

export const value = (colors) => {
    let positions = "";

    colors.forEach((color) => {
        COLORS.forEach((COLOR, j) => {
            if(COLOR == color) {
                positions += j;
            }
        })
    })

    return Number(positions);
}

export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
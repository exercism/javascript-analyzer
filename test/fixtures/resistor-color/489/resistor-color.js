export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const colorCode = (color) => {
    const lc_color = color.toLowerCase()
    for (let i = 0; i < COLORS.length; i++) {
        if (lc_color == COLORS[i]) return i;
    }
};


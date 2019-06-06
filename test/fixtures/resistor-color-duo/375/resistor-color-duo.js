export const value = (colors) => {
    let num = "";
    for (let i = 0; i < colors.length; i++) {
        num += COLORS[colors[i]]
    }
    return Number(num);
}

export const COLORS = {"black": "0", "brown": "1", "red": "2", "orange": "3", "yellow": "4", 
                       "green": "5", "blue": "6", "violet": "7", "grey": "8", "white": "9"}
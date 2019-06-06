export const COLORS = {
    "black": "0",
    "blue": "6",
    "brown": "1",
    "red": "2",
    "orange": "3",
    "yellow": "4",
    "green": "5",
    "violet": "7",
    "grey": "8",
    "white": "9"
}

export function value(colors = []) {

    let bandsValue = ""; 

    colors.forEach(element => {
        bandsValue += COLORS[element];
    });

    return parseInt(bandsValue); 

}
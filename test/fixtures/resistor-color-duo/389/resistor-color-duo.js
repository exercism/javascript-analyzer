export let decodedValue = (array) => {

    const COLORS = [
        "black",
        "brown",
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "violet",
        "grey",
        "white"
    ];



    let x = COLORS.indexOf(array[0]),
        y = COLORS.indexOf(array[1]);

    return Number(x + "" + y);
}

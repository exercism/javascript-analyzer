let color = ["brown", "yellow"];

function value(color) {
    let x = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    return x.indexOf(color[0]) * 10 + x.indexOf(color[1]);
}

module.exports = {
    value
}
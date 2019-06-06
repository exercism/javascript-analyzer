var dict = {
    "black": 0,
    "brown": 1,
    "red": 2,
    "orange": 3,
    "yellow": 4,
    "green": 5,
    "blue": 6,
    "violet": 7,
    "grey": 8,
    "white": 9
};

var COLORS = Object.keys(dict);

function colorCode(name) {
    var code = dict[name];
    if (code === undefined) {
        return -1
    }
    else {
        return code;
    }
}

export { colorCode, COLORS };

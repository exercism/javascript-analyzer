var resistors = [
    { colorNum: 0, resistorColor: "black" },
    { colorNum: 1, resistorColor: "brown" },
    { colorNum: 2, resistorColor: "red" },
    { colorNum: 3, resistorColor: "orange" },
    { colorNum: 4, resistorColor: "yellow" },
    { colorNum: 5, resistorColor: "green" },
    { colorNum: 6, resistorColor: "blue" },
    { colorNum: 7, resistorColor: "violet" },
    { colorNum: 8, resistorColor: "grey" },
    { colorNum: 9, resistorColor: "white" }
]

export const colorCode = function(color) {
    var number = 0;
    for (let i = 0; i < resistors.length; i++) {
        if (resistors[i].resistorColor === color) {
            number = resistors[i].colorNum;
            break;
        }
    }
    return number;
};

export const COLORS = resistors.map(color => `${color.resistorColor}`);
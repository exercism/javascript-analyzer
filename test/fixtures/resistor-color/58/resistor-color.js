(() => {
    const color2num  = {
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

    const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

    const colorCode = (color) => color2num[color];

    module.exports = {
        COLORS: COLORS,
        colorCode: colorCode
    };
})();

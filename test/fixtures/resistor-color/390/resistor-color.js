const colorMap = {
    "black": 0,
    "brown": 1,
    "red":2,
    "orange":3,
    "yellow":4,
    "green":5,
    "blue":6,
    "violet":7,
    "grey":8,
    "white": 9
}

module.exports={
    colorCode: colorName =>{
        return colorMap[colorName];
    },

    COLORS: Object.keys(colorMap)
}

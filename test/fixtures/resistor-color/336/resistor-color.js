class ResistorColor {
    constructor(color, id) {
        this.color = color;
        this.id = id;
    }
}

var myColors = [
    new ResistorColor("black", 0),
    new ResistorColor("brown", 1),
    new ResistorColor("red", 2),
    new ResistorColor("orange", 3),
    new ResistorColor("yellow", 4),
    new ResistorColor("green", 5),
    new ResistorColor("blue", 6),
    new ResistorColor("violet", 7),
    new ResistorColor("grey", 8),
    new ResistorColor("white", 9),    
]

export const colorCode = (color) => {
    return myColors.find(x => x.color === color.toLowerCase()).id
}

export const COLORS = myColors.map(a => a.color)
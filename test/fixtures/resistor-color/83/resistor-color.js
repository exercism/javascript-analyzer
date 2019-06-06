export var COLORS = getColors();

function getColors() {
    const colorsArray = [];
    for(let i=0; i<10; i++){
        colorsArray.push(numbersToColors(i));
    }
    return colorsArray;
}


export const colorCode = (param) => {
    switch(param){
        case "black": return 0;
        case "brown": return 1;
        case "red": return 2;
        case "orange": return 3;
        case "yellow": return 4;
        case "green": return 5;
        case "blue": return 6;
        case "violet": return 7;
        case "grey": return 8;
        case "white": return 9;
    }
}

function numbersToColors(param){
    switch(param){
        case 0: return "black";
        case 1: return "brown";
        case 2: return "red";
        case 3: return "orange";
        case 4: return "yellow";
        case 5: return "green";
        case 6: return "blue";
        case 7: return "violet";
        case 8: return "grey";
        case 9: return "white";
    }
}
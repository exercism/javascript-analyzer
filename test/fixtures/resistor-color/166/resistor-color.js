export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const colorCode = function(colorString){
    const ColorEntries = Object.entries(COLORS);
    for (const [key, value] of ColorEntries){
        if(value === colorString ){
            return parseInt(key);
        }
    }
}






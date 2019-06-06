const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

function colorCode(color) {
    
    let currentColor = color.toLowerCase();

    if(COLORS.includes(currentColor)) {
        return COLORS.indexOf(currentColor);
    }

    return "Unable to locate requested color.";
}

export {COLORS, colorCode};
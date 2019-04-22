export const toRna = (strand) => {
    var complement = "";
    for(let i = 0; i < strand.length; i++){
        switch (strand[i]){
            case "G":
                complement += "C";
                break;
            case "C":
                complement += "G";
                break;
            case "T":
                complement += "A";
                break;
            case "A":
                complement += "U";
                break;
            default:
                throw "Invalid input DNA.";
        }
    }
    return complement;
};
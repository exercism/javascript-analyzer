
export const toRna = dna => {
    if(checkDna(dna)) {
        let dnaList = dna.split(""), result = "";
        for(let item of dnaList) {
            switch(item) {
                case "G": result += "C"
                        break;
                case "C": result += "G"
                        break;
                case "T": result += "A"
                        break;
                case "A": result += "U"
                        break;
            }
        }
        return result;
    }
}

const checkDna = dna => {
    if(dna.replace(/A|C|T|G/g, "") !== ""){
        throw new Error("Invalid input DNA.")
    }
    return true
}
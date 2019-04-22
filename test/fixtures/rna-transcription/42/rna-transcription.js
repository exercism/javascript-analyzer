export const toRna = (str) => {
    let rna = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "G") rna += str[i].replace('G', 'C')
        else if (str[i] === "C") rna += str[i].replace('C', 'G')
        else if (str[i] === "T") rna += str[i].replace('T', 'A')
        else if (str[i] === "A") rna += str[i].replace('A', 'U')
        else throw new Error("Invalid input DNA.")
    }
    return rna;
}

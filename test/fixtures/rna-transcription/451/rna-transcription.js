export function toRna(str) {
    if (str == "") return "";

    let rna = {
        G: "C",
        C: "G",
        T: "A",
        A: "U"
    };

    let test = str.split("");

    let final = test.reduce((accumulator, currentValue) => {
        let nuevo = rna[currentValue];
        if (!nuevo) throw new Error('Invalid input DNA.')
        return accumulator + nuevo;
    }, "");

    return final;
}
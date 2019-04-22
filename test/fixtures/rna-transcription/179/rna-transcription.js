// Given a DNA strand, return its RNA complement (per RNA transcription).
//
// Both DNA and RNA strands are a sequence of nucleotides.
//
// The four nucleotides found in DNA are adenine (A), cytosine (C), guanine (G) and thymine (T).
//
// The four nucleotides found in RNA are adenine (A), cytosine (C), guanine (G) and uracil (U).
//
// Given a DNA strand, its transcribed RNA strand is formed by replacing each nucleotide with its complement:
//
//    G -> C
//    C -> G
//    T -> A
//    A -> U
//
export const toRna = (DNA) => {
    let RNA = "";
    let i = 0;
    for (i = 0 ; i <= DNA.length-1 ; i++) {
        if (DNA.charAt(i) == "G") RNA = RNA.concat("C");
        else if (DNA.charAt(i) == "C") RNA = RNA.concat("G");
        else if (DNA.charAt(i) == "T") RNA = RNA.concat("A");
        else if (DNA.charAt(i) == "A") RNA = RNA.concat("U");
        else throw "Invalid input DNA.";
    }
    return RNA;
}
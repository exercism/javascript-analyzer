"use strict"

export const toRna = (dna) => {
    let rna = "";

    for (var i = 0; i < dna.length; i++) {
        var character = dna.charAt(i);

        switch (character.toUpperCase()) {
            case "G":
                rna += replaceChar(character, "G", "C");
                break;
            case "C":
                rna += replaceChar(character, "C", "G");
                break;
            case "T":
                rna += replaceChar(character, "T", "A");
                break;
            case "A":
                rna += replaceChar(character, "A", "U");
                break;
            default:
                throw "Invalid input DNA.";
        }
    }

    return rna;
}

function replaceChar(letter, character, newCharacter) {
    return letter.replace(character, newCharacter);
}
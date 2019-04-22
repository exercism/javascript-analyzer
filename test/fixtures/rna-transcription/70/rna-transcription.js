"use strict";

const dnaMap = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U"
}

const transcribe = (d) => {
    const mapped = dnaMap[d];
    if(!mapped){
        throw new Error("Invalid input DNA.");
    }
    return mapped;
}

const toRna = (dna) => {
    return dna.split("").map(transcribe).join("");
}

module.exports = { toRna };
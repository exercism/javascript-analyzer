//
// This is only a SKELETON file for the 'Hello World' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const toRna = function(dna){
    let transcription = {'G' : 'C', 'C' : 'G', 'T' : 'A', 'A' : 'U'};
    return dna.split("").map((letter) => transcription[letter]).join("");
}
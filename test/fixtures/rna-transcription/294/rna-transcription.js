var RNA_TO_DNA = {"A": "U", "T": "A", "C": "G", "G": "C"}
export function toRna(sequence) {
    var result = "";
    for (var i = 0; i<sequence.length; i++) {
        var char = sequence.charAt(i);
        if (!(char in RNA_TO_DNA)) {
            throw "Invalid input DNA.";
        }
        var result = result + RNA_TO_DNA[char];
    }
    return result
}
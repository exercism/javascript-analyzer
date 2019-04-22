export function toRna(sequence) {
    if (sequence.match(/[^CGTA]/g) != null)
        throw "Invalid input DNA.";
    sequence = sequence.replace(/[CGTA]/g, (match) =>{
        switch (match) {
            case "C" : return "G";
            case "G" : return "C";
            case "T" : return "A";
            case "A" : return "U";
        }
    });
    return sequence;
}

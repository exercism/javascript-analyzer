const TRANSLATIONS = {
  "G": "C",
  "C": "G",
  "T": "A",
  "A": "U",
};

function isValidLetter(letter) {
  return letter === "G" || letter === "C" || letter === "T" || letter === "A"
}

export function toRna(sequence) {
  let translatedSequence = "";

  for (let i = 0; i < sequence.length; i++) {
    let letter = sequence[i];
    if (!isValidLetter(letter)) {
      throw new Error("Invalid input DNA.");
    }

    translatedSequence += TRANSLATIONS[letter];
  }

  return translatedSequence
}

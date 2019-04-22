export const toRna = (i) => {
  const subs = {
    "A": "U",
    "G": "C",
    "C": "G",
    "T": "A",
  };
  return i.split("").map(letter => {
    if (subs[letter]) {
      return subs[letter];
    }
    throw new Error('Invalid input DNA.');
  }).join("");
};

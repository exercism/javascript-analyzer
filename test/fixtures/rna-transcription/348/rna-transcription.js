/*

Data Definition:

ListOfDNA is one of:
- empty
- "A"
- "C"
- "G"
- "T"
- [ListOfDNA[0], ...ListOfDNA]

interpretation:
DNA represents the list of the nucleoutides found in DNA

Template function:
const funcForDNA = (str) => {
  if (str === '') {
    return ...
  }
  if (str === "A") {
    return ...
  } else if (str === "C") {
    return ...
  }
   else if (str === "G") {
    return ...
  }
   else if (str === "T") {
    return ...
  } else {
    return str[0] funcForDNA(...str)
  }
}
*/

// Function Definition:

// ListOfDNA -> String
// returns the equivalent RNA transcription of a given DNA strand

export const toRna = (str) => {
  try {
    if (str === '') {
      return '';
    }
    if (str === 'A') {
      return 'U';
    }
    if (str === 'C') {
      return 'G';
    }
    if (str === 'G') {
      return 'C';
    }
    if (str === 'T') {
      return 'A';
    }
    if (str.length > 1) {
      return toRna(str[0]).concat(toRna(str.slice(1)));
    }
    throw new Error('Invalid input DNA.');
  } catch (e) {
    throw e;
  }
};

function validator(sequence) {
  sequence = sequence.split('');
  for (let letter = 0; letter < sequence.length; letter++) {
    if (
      sequence[letter] !== 'A' &&
      sequence[letter] !== 'C' &&
      sequence[letter] !== 'G' &&
      sequence[letter] !== 'T'
    ) {
      return false;
    } else {
      return true;
    }
  }
}

function toRna(masterTranscription) {
  if (validator(masterTranscription)) {
    masterTranscription = masterTranscription.split('');

    let holder = masterTranscription.map(letter => {
      if (!letter) {
        return;
      } else if (letter === 'A') {
        return (letter = 'U');
      } else if (letter === 'C') {
        return (letter = 'G');
      } else if (letter === 'G') {
        return (letter = 'C');
      } else if (letter === 'T') {
        return (letter = 'A');
      } else {
        throw new Error('Invalid input DNA.');
      }
    });
    return holder.join('');
  } else if (!masterTranscription) {
    return masterTranscription;
  } else {
    throw new Error('Invalid input DNA.');
  }
}

try {
  toRna(masterTranscription);
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}
module.exports = { toRna };

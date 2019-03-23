export const twoFer = (name) => {
  let phrase = 'One for you, one for me.';
  if (name) {
    phrase = phrase.replace('you', name);
  }
  return phrase;
};

export const twoFer = (name) => {
  const sentence = 'One for you, one for me.';
  if (name === '') {
    return sentence;
  }
  return sentence.replace('you', name);
};

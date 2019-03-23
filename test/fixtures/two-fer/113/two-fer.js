export const twoFer = (name) => {
  if (name === 'Alice') {
    return 'One for Alice, one for me.';
  } else if (name === '') {
    return 'One for you, one for me.';
  }
  return ('One for ' + name + ', one for me.');
};

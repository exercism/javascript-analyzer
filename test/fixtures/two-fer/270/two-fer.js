/* eslint-disable linebreak-style */
// export the function so the test function can find it

export const twoFer = (name) => {
  if (name === '') {
    return ('One for you, one for me.');
  } if (name === 'Alice') {
    return ('One for Alice, one for me.');
  }
  return (`One for ${name}, one for me.`);
};

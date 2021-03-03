export const twoFer = (name) => {
  let x = '';
  if (name === '') {
    x = 'you';
  } else {
    x = name;
  }
  return (`One for ${x}, one for me.`);
};

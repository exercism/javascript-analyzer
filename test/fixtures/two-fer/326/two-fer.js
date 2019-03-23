// jshint esversion: 6
export const twoFer = (name) => {
  let X = '';
  if (name.length > 0) {
    X = name;
  } else {
    X = 'you';
  }
  return (`One for ${X}, one for me.`);
};

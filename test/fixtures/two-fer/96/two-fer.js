export const twoFer = (name) => {
  if (name === '') {
    name = 'you';
  } if (name === 'Alice') {
    name = 'Alice';
  } if (name === 'Bob') {
    name = 'Bob';
  }
  return `One for ${name}, one for me.`;
};

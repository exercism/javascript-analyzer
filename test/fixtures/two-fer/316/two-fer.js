export const twoFer = (person) => {
  let name = person;
  if (!person) {
    name = 'you';
  }
  return `One for ${name}, one for me.`;
};

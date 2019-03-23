export const twoFer = (name) => {
  const person = (name === '') ? 'you' : name;
  return `One for ${person}, one for me.`;
}
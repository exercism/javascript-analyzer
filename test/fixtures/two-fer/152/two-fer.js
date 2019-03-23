export const twoFer = (name = null) => {
  if (name) return `One for ${name}, one for me.`;
  return 'One for you, one for me.';
}
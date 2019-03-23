export const twoFer = (name = 'you') => {
  if (typeof name !== 'string') throw new Error('Expect string as argument');
  return `One for ${name || 'you'}, one for me.`;
};

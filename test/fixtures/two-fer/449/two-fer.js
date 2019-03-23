const twoFer = (name) => {
  const n = name && name !== '' ? name : 'you';

  return `One for ${n}, one for me.`;
};

export { twoFer };

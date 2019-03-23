export const twoFer = (userName) => {
  let name = 'you';
  const phrase1 = 'One for ';
  const phrase2 = ', one for me.';
  if (userName) {
    name = userName;
  }
  return phrase1 + name + phrase2;
};

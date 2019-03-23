export const twoFer = (name) => {
  let string = 'One for you, one for me.';
  if (name.length > 0) {
    string = string.replace('you', name);
  }

  return string;
};
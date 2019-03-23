export const twoFer = (name) => {
  var text = 'One for ';
  if (name == '') name = 'you';
  return text.concat(name).concat(', one for me.');
};

export const twoFer = name => {
  if (name === '') {
    name = 'you';
  }
  const phrase = 'One for ' + name + ', one for me.' ;
  return phrase;
}
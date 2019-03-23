export function twoFer(nameInput = '') {
  let name = nameInput;
  if (name === '') {
    name = 'you';
  }
  return `One for ${name}, one for me.`;
}

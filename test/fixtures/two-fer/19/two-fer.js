export function twoFer(name) {
  let mention = name;

  if (name === '') {
    mention = 'you';
  }
  return `One for ${mention}, one for me.`;
}

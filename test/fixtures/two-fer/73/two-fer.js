export function twoFer(name) {
  let you;
  name ? you = name: you = 'you';
  return `One for ${you}, one for me.`;
}
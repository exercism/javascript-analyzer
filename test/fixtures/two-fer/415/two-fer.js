export function twoFer(name) {
  let notMe = 'you';
  
  if (name != null && name.length > 0) notMe = name;

  return `One for ${notMe}, one for me.`;
}

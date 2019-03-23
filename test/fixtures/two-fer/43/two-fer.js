export function twoFer(name = 'you') {
  const realName = name.length === 0 ? 'you' : name;
  return `One for ${realName}, one for me.`;
}

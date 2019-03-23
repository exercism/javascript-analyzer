export const twoFer = (name = 'you') => {
  if(name.length <= 0){
    return `One for you, one for me.`;
  }
  return `One for ${name}, one for me.`;
}
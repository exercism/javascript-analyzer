export const twoFer = (you) => {
  if (you.length === 0) {
    you = 'you'
  }
  return (`One for ${you}, one for me.`)
}

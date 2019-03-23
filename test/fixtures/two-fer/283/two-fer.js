export const twoFer = (name) => {
  switch (name) {
    case '':
      return 'One for you, one for me.'
    case 'Alice':
      return 'One for Alice, one for me.'
    default:
      return `One for ${name}, one for me.`
  }
}
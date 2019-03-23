const twoFer = name => {
  if (name) {
    name.toString()
    return `One for ${name}, one for me.`
  }
  else {
    return "One for you, one for me."
  }
}

export {twoFer}

function twoFer(name) {
  if (name === undefined) {
    let info = "One for you, one for me.";
    return info;
  }
  let info = `One for ${name}, one for me.`;
  return info;
}

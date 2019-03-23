export const twoFer = name => {
  if (name === "") {
    return "One for you, one for me.";
  } else {
    return `One for ${name}, one for me.`;
  }
};
//Would ternary look like this?
// name === "" ? "One for you, one for me." : `One for ${name}, one for me.`;

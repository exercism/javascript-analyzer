const twoFer = (name = "") => {
  if (name) {
    const sentence = "One for " + name + ", one for me";
    return sentence;
  } else {
    const sentence = "One for you, one for me.";
    return sentence;
  }
};

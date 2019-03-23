export const twoFer = name => {
  var temp = new String();
  if (name == "") {
    temp = "you";
  } else {
    temp = name;
  }
  return "One for " + temp + ", one for me.";
};

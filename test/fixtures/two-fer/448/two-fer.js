export const twoFer = (name = "you") => {
  name =  name != "" ? name : "you";
  return ("One for " + name + ", one for me.");
};



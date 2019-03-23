export function twoFer(name) {
  var givenName = name;
  if (name === "") {
    givenName = "you";
  }
  return "One for " + givenName + ", one for me.";
}

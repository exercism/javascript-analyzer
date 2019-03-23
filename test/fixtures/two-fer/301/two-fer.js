export const twoFer = (name = '') => {
return "One for " + (name == null || name.length == 0 ? "you" : name) + ", one for me.";
};

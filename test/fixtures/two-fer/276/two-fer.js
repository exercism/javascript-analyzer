export const twoFer = (name) => {
  if (name === '') {
    return 'One for you, one for me.';
  }

  return `One for ${name}, one for me.`; // cest = a "One for " + name + ", one for me.";
};


// concatenation exemple:
// var chaine1 = "Bonjour "; var chaine2 = "tout le monde"; var chaine3 = chaine1+chaine2;

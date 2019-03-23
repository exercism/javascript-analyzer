// create a function that takes in a name and returns a string
export const twoFer = (name) => {
  let person;
  person = name;
  if (!name) {
    person = 'you';
  }

  return `One for ${person}, one for me.`;
};

twoFer('Bob');

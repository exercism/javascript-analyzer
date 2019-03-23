
export const twoFer = (name) => {
  let myName = name;
  if (myName === '') {
    myName = 'you';
  }
  return 'One for ' + myName + ', one for me.';
};

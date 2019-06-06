export const value = (array) => {
  let firstNumber = null;
  let secondNumber = null;

  firstNumber = COLORS.indexOf(array[0]);
  secondNumber = COLORS.indexOf(array[1]);

  return parseInt(firstNumber.toString() + secondNumber.toString());

};

const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
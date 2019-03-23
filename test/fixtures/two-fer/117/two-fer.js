export const twoFer = () => {
  
  function giveName(nameGiven) {
    let name;
    switch (nameGiven) {
      case "Alice":
        name = "Alice";
        break;
      default:
        name = "you";
        break;
    }
    return  `One for ${name}, one for me `
  }

};

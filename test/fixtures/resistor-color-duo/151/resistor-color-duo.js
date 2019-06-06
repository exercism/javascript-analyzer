export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]
export const value = (colors) => {
  colors.reverse();
  // let endValue = 0;
  // for (let i = 0; i < colors.length; i++) {
  //   endValue += COLORS.indexOf(colors[i]) * (10**i);
  // }
  // return endValue;
  return colors.reduce((accumulator, currentValue, currentIndex) => {
    return accumulator + (COLORS.indexOf(currentValue) * (10 ** currentIndex));
  }, 0);
}


// return COLORS.indexOf(colors[0])*10 + COLORS.indexOf(colors[1])
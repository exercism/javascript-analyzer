export const value = ([bandColorOne, bandColorTwo]) => {
  const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

  const resistanceValue = calcResistance();

  function calcResistance() {
    const resistanceCalc = Number(`${COLORS.indexOf(bandColorOne)}${COLORS.indexOf(bandColorTwo)}`)

    return resistanceCalc;
  }

  return resistanceValue;
}
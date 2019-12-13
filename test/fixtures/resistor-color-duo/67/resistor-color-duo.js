export const decodedValue = (bands) => {
  let numberString = "";
  const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
  for (let color of bands) {
    numberString += (COLORS.indexOf(color)).toString();
  }
  return parseInt(numberString);
}

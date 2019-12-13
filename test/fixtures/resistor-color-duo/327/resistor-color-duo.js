export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const decodedValue = (inputArray) => {
  return parseInt(COLORS.indexOf(inputArray[0]).toString() + COLORS.indexOf(inputArray[1]).toString())
}

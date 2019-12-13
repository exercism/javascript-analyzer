export const decodedValue = (array) => {
  return Number(String(colors.indexOf(array[0])) + String(colors.indexOf(array[1])));
}

const colors = [
  "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"
]

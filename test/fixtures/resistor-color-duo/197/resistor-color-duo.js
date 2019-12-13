const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const decodedValue = (selectedColors) => {
  let result = ''

  for (let i = 0; i < selectedColors.length; i++) {
    for (let j = 0; j < COLORS.length; j++) {
      if (selectedColors[i] === COLORS[j]) {
        result = result + j.toString()
      }
    }
  }
  return parseInt(result)
}

const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function decodedValue(bands) {
  return parseInt(bands.reduce((val, band) => val + COLORS.indexOf(band), ''))
}

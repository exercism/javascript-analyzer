export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']

export function getColorCode(color) {
  let colorCode = COLORS.indexOf(color)
  return colorCode >= 0 ? colorCode : 'Color not found'
}

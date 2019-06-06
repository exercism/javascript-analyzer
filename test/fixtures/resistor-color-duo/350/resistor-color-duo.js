export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = color => COLORS.indexOf(color)

export const value = colors => {
  let firstColor, secondColor
  [firstColor, secondColor] = colors
  return parseInt(`${colorCode(firstColor)}${colorCode(secondColor)}`)
}

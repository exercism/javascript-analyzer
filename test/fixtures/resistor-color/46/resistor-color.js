const resistorColor = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = (color) => {
  if(resistorColor.includes(color)) {
    return resistorColor.indexOf(color)
  }
}

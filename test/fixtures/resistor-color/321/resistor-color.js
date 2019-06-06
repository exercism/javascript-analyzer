export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const colorCode = (color) => {
  const i = COLORS.findIndex(value => value === color)
  
  return i === -1 ? "No Match" : i
}
const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]


export const value = (colors) => {
  const value = colors.reduce(
    (acc, colour) => acc += COLORS.findIndex(color => color === colour), ''
  )
  return Number(value)
}
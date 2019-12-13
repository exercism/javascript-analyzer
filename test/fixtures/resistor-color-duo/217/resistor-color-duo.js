const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]


export const decodedValue = (colors) => {
  const decodedValue = colors.reduce(
    (acc, colour) => acc += COLORS.findIndex(color => color === colour), ''
  )
  return Number(decodedValue)
}

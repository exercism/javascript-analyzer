export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const decodedValue = colors => Number(colors.reduce((code, color) => `${code}${COLORS.indexOf(color)}`, ''))

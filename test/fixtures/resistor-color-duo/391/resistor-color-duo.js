export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const colorCode = color => COLORS.indexOf(color)
export const value = colors => {
    const n_list = colors.map(color => colorCode(color))
    return Number(n_list.join(""))
}
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const decodedValue = (colorArray) => {
    let tempString = ''
    colorArray.forEach(color => {
        tempString = tempString + COLORS.indexOf(color)
    })
    return Number(tempString)
}

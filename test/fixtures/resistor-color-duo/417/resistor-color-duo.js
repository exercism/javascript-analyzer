export const decodedValue = (array) => {
    let total = ''
    for (let color of array) {
        total = total + COLORS.indexOf(color).toString()
    }
    return parseInt(total)
}

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const decodedValue = ([color1, color2]) => {
    const c1 =  colors.indexOf(color1)
    const c2 =  colors.indexOf(color2)
    return parseInt(c1+''+c2)
}

const colors = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

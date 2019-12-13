const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const decodedValue =  ([colorOne,colorTwo])=>{
    return Number([COLORS.indexOf(colorOne.toLowerCase()),COLORS.indexOf(colorTwo.toLowerCase())].join(''))
}

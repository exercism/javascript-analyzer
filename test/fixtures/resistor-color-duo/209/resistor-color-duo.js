const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const value =  ([colorOne,colorTwo])=>{
    return Number([COLORS.indexOf(colorOne.toLowerCase()),COLORS.indexOf(colorTwo.toLowerCase())].join(''))
}

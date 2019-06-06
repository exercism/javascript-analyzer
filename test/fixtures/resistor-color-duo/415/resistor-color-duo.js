export function value(color_array){
    let sum = ''
    for (let count =0; count < color_array.length; count++){
        sum = sum + COLORS.indexOf(color_array[count])
    }

    console.log("sum: " + sum)
    return parseInt(sum)
}

export const COLORS = ['black','brown',"red","orange","yellow","green","blue","violet","grey","white"]
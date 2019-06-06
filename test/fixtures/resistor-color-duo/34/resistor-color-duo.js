const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

const colorCode = function (color){
    return COLORS.indexOf(color)
}

export const value = (colors) => {
    let val = 0;

    colors.forEach((element,index) =>{
        //shift over the previous value and add the current color code value
        val =  (val * Math.pow(10,index)) + colorCode(element)
    })
    return val;
}


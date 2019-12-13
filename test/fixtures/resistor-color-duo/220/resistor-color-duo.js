
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]


export const decodedValue = (colors)=>{
    let val=0;
    let decimalPart=1;
    for(let i=colors.length-1;i>=0;i--){
        val+=COLORS.indexOf(colors[i])*decimalPart;
        decimalPart*=10;
    }
    return val;
};

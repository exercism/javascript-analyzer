const COLORS =["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
const colorCode = (key,color='black')=>{

    if(key){
        color=key
    }
    
    let index = COLORS.findIndex(colors => colors===color)
    return index
}


export {COLORS,colorCode}
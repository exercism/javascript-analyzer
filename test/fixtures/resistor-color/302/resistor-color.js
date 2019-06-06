export const COLORS  = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
    

export const colorCode = (color) =>{
    color.toLowerCase(); 
    color = color.charAt(0).toUpperCase() + color.slice(1);
    if (COLORS.indexOf(color)>=0){
    return  COLORS.indexOf(color);
    }else return("couldn't find the color in the COLORS");
}

        


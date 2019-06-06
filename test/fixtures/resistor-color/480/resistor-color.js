

export const COLORS=["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode=(x="black")=>{
    for (let i = 0; i < COLORS.length; i++){
        if (COLORS[i].toString() === x){
            return i;
        }
    }

}

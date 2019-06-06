export const colorCode =(x) =>{
    let arr = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    let result="";

    for(var i=0; i<=arr.length; i++){
        result = result + arr.indexOf(x);
        return parseInt(result);
    }

};

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];


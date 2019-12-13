const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const colorCode = (decodedValue) =>{

    return COLORS.indexOf(decodedValue);

}

const decodedValue =(arr)=>{
    var sol='';
    for(var elem in arr){
        sol=sol+colorCode(arr[elem]);
    }
    return parseInt(sol);

}

export {COLORS , colorCode, decodedValue};

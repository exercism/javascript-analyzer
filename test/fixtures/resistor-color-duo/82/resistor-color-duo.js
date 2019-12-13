

export const decodedValue = (tab)=>{

    var COLORS = [
        "black","brown","red","orange","yellow","green","blue","violet","grey","white"
    ]

    var index1 =  COLORS.indexOf(tab[0]).toString();
    var index2 =  COLORS.indexOf(tab[1]).toString();

    var index = index1 + index2
    return  parseInt(index);

}

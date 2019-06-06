export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value =(name) =>{
    name = "";
    for (var i=0; i<2; i++){
        name = name+COLORS.indexOf(name);
    }
    return parseInt(name)
};

// export const colorCode = (name) =>{
//     if (name == "black"){
//         return 0;
//     }
//     else if (name=="white") {
//         return 9
//     }
//     else return 3
// };

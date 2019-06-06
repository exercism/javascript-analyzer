var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
function colorCode(sss){
    let x = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    for(let i = 0; i < x.length; i++){
        if(x[i] == sss){
            return i;
        };
    };
};



module.exports = {colorCode, COLORS}
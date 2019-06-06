"use strict";

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

function value(colorBands){

    const res = colorBands.reduce((acc, ele) => acc + COLORS.indexOf(ele), "");

    return Number(res)
}

export {value};


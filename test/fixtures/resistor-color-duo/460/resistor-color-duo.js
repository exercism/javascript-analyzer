import {colorCode} from "../resistor-color/resistor-color";

export const value = ([color1,color2]) =>{
    return colorCode(color1)+colorCode(color2)
};
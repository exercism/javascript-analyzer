import { isArray } from "util";

const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export  function value(colourArray){
    if (isArray(colourArray)){
        let value=""
        for(let i=0;i<colourArray.length;i++){
            value+=COLORS.indexOf(colourArray[i])
        }
        return parseInt(value)
    }
    return -1
}
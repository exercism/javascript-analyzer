import { isArray } from "util";

const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export  function decodedValue(colourArray){
    if (isArray(colourArray)){
        let decodedValue=""
        for(let i=0;i<colourArray.length;i++){
            decodedValue+=COLORS.indexOf(colourArray[i])
        }
        return parseInt(decodedValue)
    }
    return -1
}

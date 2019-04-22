export const toRna = (dnaStr) => {
    if (dnaStr == "") {
        return "";
    } else {
        let i;
        let resultado = "";
        for (i = 0; i < dnaStr.length; i++) { 
          if (dnaStr[i] == "G") {
                resultado = resultado + "C";
            } else if (dnaStr[i] == "C") {
                resultado = resultado + "G";
            } else if (dnaStr[i] == "T") {
                resultado = resultado + "A";
            } else if (dnaStr[i] == "A") {
                resultado = resultado + "U";
            } else
                resultado = resultado + dnaStr[i];
        }; 
        return resultado;
    }
}
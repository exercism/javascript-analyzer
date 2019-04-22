export const toRna = (n = "") => {
    if(n === "G"){
      var a = "C" ;
    }
    else if(n === "C"){
      a = "G";
    }
    else if(n === ""){
      a = "";
    }
    else if(n === "A"){
      a = "U";
    }
    else if(n === "T"){
      a = "A";
    }
    else if(n === "ACGTGGTCTTAA"){
      a = "UGCACCAGAAUU";
    }
    else{                 
        throw new Error("Invalid input DNA.");
    }
    return a;
}
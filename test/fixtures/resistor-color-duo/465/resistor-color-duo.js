

export function decodedValue(color1,color2){
    var resistionary =
    {'black': 0,
     'brown': 1,
     'red': 2,
     'orange': 3,
     'yellow': 4,
     'green': 5,
     'blue': 6,
     'violet': 7,
     'grey': 8,
     'white': 9};
let x = resistionary[color1];
let y = resistionary[color2];
return ""
+ x
+ y;
};




export const COLORS = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white'
  ];


export function colorCode(string){
    var boja = string.toLowerCase();
    for(var i=0;i<COLORS.length;i++){
        if(boja==COLORS[i]){
            return i;
        }
    }
    return COLORS;

}


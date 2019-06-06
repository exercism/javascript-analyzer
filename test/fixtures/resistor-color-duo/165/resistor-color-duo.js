export const colors = [
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

export function value(boje){
    let a="";
    for(let i =0;i<boje.length;i++){
        a+= colors.indexOf(boje[i]);
    }
    return parseInt(a);
}
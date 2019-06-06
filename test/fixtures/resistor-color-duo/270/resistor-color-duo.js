const colorArray=["black","brown","red","orange", "yellow", "green","blue", "violet", "grey","white"];

export function value(colors){
    return colorArray.indexOf(colors[0])*10+colorArray.indexOf(colors[1]);
}
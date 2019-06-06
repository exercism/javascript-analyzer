const COLORS =["black","brown","red","orange","yellow","green", "blue", "violet","grey","white"];

function colorCode(color) {
  if(COLORS.includes(color)){
    return COLORS.indexOf(color);
  }
  else{
    return -1;
  }
}

export const value = (colors) => {
  const array = new Array;
  colors.forEach(element => {
    array.push(colorCode(element));
  });
  return Number(`${array[0]}${array[1]}`)
}

let colorArr = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (color) => {
  for (let i = 0; i < colorArr.length; i++){
    if (color === colorArr[i]){
      return colorArr.indexOf(color);
    }
  }
}


export const COLORS = () => {
  return colorArr;
}
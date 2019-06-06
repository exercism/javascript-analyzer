export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (type) => {
  let spot = '';
  COLORS.forEach((element, index) => {
    if(element === type){
      spot = index;
    }
  });
  return spot;
}
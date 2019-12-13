export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const decodedValue = (colorArr) => {
  var numStr = '';
  for (var i=0; i<colorArr.length; i++){
    var num = COLORS.indexOf(colorArr[i]);
    numStr += num.toString()
  }
  var num = parseInt(numStr);
  return num;
};

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = colors => {
  let total = 0;
  let mantissa;

  colors.reverse().forEach(function(value, index){
      mantissa = COLORS.indexOf(value);
      total += mantissa * Math.pow(10, index);
  })

  return total;
};
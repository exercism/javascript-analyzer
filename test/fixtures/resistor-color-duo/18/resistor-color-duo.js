export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = colors => {
  let total = 0;
  let mantissa;

  colors.reverse().forEach(function(decodedValue, index){
      mantissa = COLORS.indexOf(decodedValue);
      total += mantissa * Math.pow(10, index);
  })

  return total;
};

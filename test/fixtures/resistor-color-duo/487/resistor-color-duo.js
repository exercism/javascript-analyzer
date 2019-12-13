export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = ([x,y]) => {
  let a = COLORS.indexOf(x);
  let b = COLORS.indexOf(y);

  return Number("" + a + b);

}

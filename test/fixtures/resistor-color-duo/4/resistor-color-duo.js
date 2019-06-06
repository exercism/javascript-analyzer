export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function value(colors){
  let value = '';
  colors.forEach(element => {
    value += (COLORS.indexOf(element));
  });
  return Number(value);
}
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function decodedValue(colors){
  let decodedValue = '';
  colors.forEach(element => {
    decodedValue += (COLORS.indexOf(element));
  });
  return Number(decodedValue);
}

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function decodedValue(colors) {
  let code = ''
  for (let color of colors) code += COLORS.indexOf(color);
  return Number(code);
}

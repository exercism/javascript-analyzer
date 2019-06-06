export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const value = (colors) => {
  let code = "";
  for (var color of colors ) {
    code += COLORS.indexOf(color);
  }
  return parseInt(code);
}

value(["black", "blue", "orange"]);
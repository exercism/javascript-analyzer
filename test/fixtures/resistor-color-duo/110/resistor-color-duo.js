const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = function(colors) {
  return + colors.map(c => COLORS.indexOf(c)).join('');
};
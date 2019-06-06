const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = colors => {
  let value = '';
  colors.forEach(val => {
    if (COLORS.includes(val)) {
      value += COLORS.indexOf(val);
    }
  });

  return Number(value);
};

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = colors => {
  let decodedValue = '';
  colors.forEach(val => {
    if (COLORS.includes(val)) {
      decodedValue += COLORS.indexOf(val);
    }
  });

  return Number(decodedValue);
};

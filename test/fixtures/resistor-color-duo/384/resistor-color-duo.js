const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (bandColors) => {
  const resistorColor = `${COLORS.indexOf(bandColors[0])}${COLORS.indexOf(bandColors[1])}`;

  return parseInt(resistorColor, 10);
}

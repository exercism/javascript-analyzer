export const decodedValue = (args) => {
  const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
  return parseInt(`${COLORS.indexOf(args[0])}${COLORS.indexOf(args[1])}`);
};

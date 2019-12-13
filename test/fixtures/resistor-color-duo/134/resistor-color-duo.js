const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const decodedValue = (colors) => +colors.map(c => COLORS.indexOf(c)).join('');

export { decodedValue };

export const Colors = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = args => parseInt(args.map(color => Colors.indexOf(color)).join(''))
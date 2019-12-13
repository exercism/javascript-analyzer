const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

function decodedValue(combine) {
  var res = [COLORS.indexOf(combine[0]), COLORS.indexOf(combine[1])];
  res.reverse();
  return Number(`${res[1]}${res[0]}`);
}

export { decodedValue };

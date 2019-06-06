const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

function value([c1, c2]) {
  let v1 = COLORS.indexOf(c1);
  let v2 = COLORS.indexOf(c2);

  return (v1 * 10) + v2;
};


export { value };

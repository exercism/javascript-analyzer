const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const decodedValue = (codes) => {
  const colorDuo = codes.map((color)=>{
    if ( COLORS.indexOf(color) != -1 ) { return COLORS.indexOf(color) }
  }).join('');

  return Number(colorDuo);
}

export { decodedValue };

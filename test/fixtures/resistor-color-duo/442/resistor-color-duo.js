export const value = (arr) => {
  let colors =  ["black" ,"brown" ,"red" ,"orange" ,"yellow" ,"green" ,"blue" ,"violet" ,"grey" ,"white"]; 
  var x = colors.indexOf(arr[0]).toString();
  var y = colors.indexOf(arr[1]).toString();
  return Number(x.concat(y)) 
}
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = (input) => {
  let i = 0;
  var t;
  var ret = COLORS.forEach((element, index, array) => {
    i++
    if(element == input) t = i
  })
  return t -1
}

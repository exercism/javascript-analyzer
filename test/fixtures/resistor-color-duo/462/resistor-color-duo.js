
export const value = (arr) => {

  const colors = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
  let code = '';

  for (let i = 0; i < arr.length; i++) {
    code += colors.indexOf(arr[i]);
  }

  return Number(code);
}
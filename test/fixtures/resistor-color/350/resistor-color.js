/*Must keep order of colors so mnemonic makes sense
  Place color values into array
  Create a function that pairs array values to their correct mnemonic index
    return that function*/

const colorArray = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

function colors(values) {
  return colorArray.indexOf(values);
}

export {colorArray, colors};
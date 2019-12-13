
// Define the COLORS object (to be able to use name:decodedValue pairs)
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

// Define the color corresponding code
export const colorCode = (myColor) => {

  return COLORS.indexOf(myColor);

};

// Define the number corresponding to colour array
export const decodedValue = (myColors) => {

  var myValues = myColors.map(colorCode);
  return Number(myValues.join(""));

};

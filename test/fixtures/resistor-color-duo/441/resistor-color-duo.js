const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const decodedValue = (arr) => {

   var concat = COLORS.indexOf(arr[0]) + "" + COLORS.indexOf(arr[1]);

   return parseInt(concat);
}

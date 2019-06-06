export function colorCode(color) {

   const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

   const RESULT = COLORS.indexOf(color);

   return RESULT !== -1 ? RESULT : 'Wrong color!';
}

export function value(colorsParams) {
   const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

   const [COLOR1, COLOR2] = COLORS.reduce((colorsArray, currentColor, index) => {
      if (colorsParams[0] === currentColor) {
         colorsArray[0].push(index);
         return colorsArray;
      }

      if (colorsParams[1] === currentColor) {
         colorsArray[1].push(index);
         return colorsArray;
      }

      return colorsArray;
   }, [[], []]);

   const result = `${COLOR1}${COLOR2}`;
   return +result;
}

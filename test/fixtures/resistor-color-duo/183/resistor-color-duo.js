const decodedValue = ([colorOne, colorTwo]) => {
   const colors = [
      "black",
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "violet",
      "grey",
      "white"
      ];
      const val = colors.indexOf(colorOne.toLowerCase()).toString() + colors.indexOf(colorTwo.toLowerCase()).toString();
   return parseInt(val);
};

export {decodedValue};


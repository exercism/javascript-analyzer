const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function value(colorNames) {
  var result = colorNames.map(function(currentName, mapIndex){
  	return COLORS.reduce((accumulator, currentValue, currentIndex) => {
  	  return (currentValue == currentName) ? currentIndex : accumulator;
  	}, undefined);
  });

  return result.join('') * 1;
}

export { value };
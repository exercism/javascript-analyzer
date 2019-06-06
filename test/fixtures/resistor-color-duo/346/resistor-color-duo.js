export const value = function(bands) {
	const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

	if (bands[0] == bands[1]) { // Case: matching bands
		let resistor = COLORS.indexOf(bands[0]).toString();

		return parseInt(resistor + resistor);
	}

	let digit1 = -1
	let digit2 = -1;
	
	// Search for both resistor values
	for (let i = 0; digit1 < 0 || digit2 < 0 && i < COLORS.length; i++) { 
		if (bands[0] == COLORS[i]) 
			digit1 = i;
		else if (bands[1] == COLORS[i]) 
			digit2 = i;		
	}

	return parseInt(digit1.toString() + digit2.toString());
};
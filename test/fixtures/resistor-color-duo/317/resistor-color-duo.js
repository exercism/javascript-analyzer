export var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export function value([color1, color2]) {
	var num1 = COLORS.indexOf(color1);
	var num2 = COLORS.indexOf(color2);
	var num3 = num1.toString() + num2.toString();
return parseInt(num3);	
}
	

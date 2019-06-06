var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
function value(colorCode){
	return parseInt((Array.from(colorCode , element=> COLORS.includes(element) ? COLORS.indexOf(element) : "")).join(''));
}

module.exports={ value };
const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export function decodedValue(arrElem) {
	let result = '';
    for (var i = 0; i < arrElem.length;i++) {
        arrElem[i];
        result += colors.indexOf(arrElem[i]);
		}
		return parseInt(result);
}


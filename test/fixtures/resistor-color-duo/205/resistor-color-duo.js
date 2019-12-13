export const decodedValue = (arr) => {
    const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    var sum = 0;
	for (var color in arr) {
    	sum += COLORS.indexOf(arr[color]).toString()
	}
    return Number(sum);
}

export function decodedValue(arr) {
    let color = {
        'black': '0',
        'brown': '1',
        'red': '2',
        'orange': '3',
        'yellow': '4',
        'green': '5',
        'blue': '6',
        'violet': '7',
        'grey': '8',
        'white': '9'
    }
    return Number(arr.reverse()
	    .reduce((acc, item) => color[item] + acc, ''))
}

export const decodedValue = array=>{
	let result = array.map(a=>
        [
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
        ].indexOf(a)
	).join('');
	return Number( result );
}

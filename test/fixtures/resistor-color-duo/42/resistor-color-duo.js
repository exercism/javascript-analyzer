export function value ( colorCode ) {
	const colors = [ "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white" ];
	let value = '';
	for ( const color of colorCode ) {
		value += ( colors.indexOf( color ));
	}
	return parseInt( value );
}


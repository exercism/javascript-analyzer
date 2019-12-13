export function decodedValue ( colorCode ) {
	const colors = [ "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white" ];
	let decodedValue = '';
	for ( const color of colorCode ) {
		decodedValue += ( colors.indexOf( color ));
	}
	return parseInt( decodedValue );
}


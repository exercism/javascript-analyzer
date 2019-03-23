export function twoFer(name) {
	
	if (name.length == 0) {
			name = 'you';
	}
	
	var response = 'One for ' + name + ', one for me.';
	return response;
}
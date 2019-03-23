import { name } from './two-fer.spec';
export const twoFer = () => {
	const phraseDefault = `One for ${ name }, one for me.`;
	const phraseUndefined =`One for you, one for me.`;
	switch(typeof(name)){
		case undefined:
			return phraseUndefined;
			break;
		default:
			return phraseDefault;
			break;
	}
}
	
	/*
	if (typeof (reciever)== undefined){
		reciever = `you`;
		return String(phrase);
	}
	if (typeof (reciever)== String){
		return String(phrase);
	}
	*/

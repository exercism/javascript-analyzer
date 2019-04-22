export function toRna(seq) {
    return seq.replace(/./g, (c) => {
	switch (c) {
	case 'G':
	    return 'C';
	    break;
	case 'C':
	    return 'G';
	    break;
	case 'T':
	    return 'A';
	    break;
	case 'A':
	    return 'U';
	    break;
	default:
	    throw new Error('Invalid input DNA.');
	    
	}
    });
}

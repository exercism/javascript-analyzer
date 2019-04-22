module.exports  = {
    toRna: function(dna) {
        let transcript = {
            'G': 'C',
            'C': 'G',
            'T': 'A',
            'A': 'U',
        };
        let error = () => {
            throw 'Invalid input DNA.';
        }
        return Array.from(dna)
            .map(x => {
                return transcript[x] || error();
            })
            .join('');
    }
}



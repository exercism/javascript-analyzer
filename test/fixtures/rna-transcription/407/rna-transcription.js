export let toRna = function(str) {
    if(! str.match(/^[CGAT]*$/g))
        throw new Error('Invalid input DNA.');

    let replacements = {C: 'G', G: 'C', A: 'U', T: 'A'};

    return str.split('')
             .map((v) => replacements[v])
             .join('');
}

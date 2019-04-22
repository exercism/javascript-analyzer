export function toRna(seq) {
    const nucl = seq.toUpperCase().split('');
    const map = { G:'C', C:'G', T:'A', A:'U' };
    return nucl.map((v, i) => {
        if (v in map) return map[v];
        else throw new Error('Invalid input DNA.');
    }).join('');
};
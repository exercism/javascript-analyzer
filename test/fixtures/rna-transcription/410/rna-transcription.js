const Rna = {
    'G':'C',
    'C':'G',
    'T':'A',
    'A':'T'};

let toRna = (val) => {
    
    console.log ([...val].map(it=>Rna[it]).reduce((a,b)=>a+b,''));
};

export {toRna};
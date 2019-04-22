export const toRna = (input) => {
    if (input.match(/[^GCTA]/)) {
        throw 'Invalid input DNA.';
    }

    let result = replace(input, { 'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U' });
    return result;
};

function replace(input, replace) {
    let output = '';
    for (var i = 0; i < input.length; i++) {
        output += replace[input[i]];
    }

    return output;
}
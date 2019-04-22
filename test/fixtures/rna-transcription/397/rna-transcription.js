
export const toRna = (input) => {
    let map = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U'
    };
    if (input.length && !/^[G|C|T|A]+$/.test(input)) {
        throw new Error('Invalid input DNA.')
    }
    return input.split('').map(char => map[char]).join('')
}

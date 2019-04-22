/* eslint-disable linebreak-style */
/* eslint-disable indent */
export function toRna(str) {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'C') {
            arr.push('G');
        } else if (str[i] === 'T') {
            arr.push('A');
        } else if (str[i] === 'G') {
            arr.push('C');
        } else if (str[i] === 'A') {
            arr.push('U');
        } else {
            throw new Error('Invalid input DNA.');
        }
    }
    const newStr = arr.join('');
    return newStr;
}

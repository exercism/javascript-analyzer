const numArr = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export function value (arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(numArr.indexOf(arr[i]));
    }

    return parseInt(result.join(''));
}
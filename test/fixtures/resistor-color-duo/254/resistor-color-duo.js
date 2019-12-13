export {decodedValue};

// solution for any number of colors
// const decodedValue = (arr) => Number(arr.reduce((a,c) => a + bands[c], ''));


// faster solution with just 2 colors
const decodedValue = (arr) => {
    const bands = {
        black: '0',
        brown: '1',
        red: '2',
        orange: '3',
        yellow: '4',
        green: '5',
        blue: '6',
        violet: '7',
        grey: '8',
        white: '9',
    };
    return Number(bands[arr[0]] + bands[arr[1]]);
}

export const value = (inputArr) => {
    var colormapping = {
        black: 0,
        brown: 1,
        red: 2,
        orange: 3,
        yellow: 4,
        green: 5,
        blue: 6,
        violet: 7,
        grey: 8,
        white: 9,
    }

    let mappedColor = "";
    inputArr.forEach(color => {
        mappedColor += colormapping[color];
    });
   
    return parseInt(mappedColor);
};
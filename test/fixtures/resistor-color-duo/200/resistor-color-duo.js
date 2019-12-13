const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const decodedValue = (colorArray) => {
    if (colorArray.length === 0) return 0;

    let output = "";
    for (let i = 0; i < colorArray.length; i++) {
        output += colors.indexOf(colorArray[i]);
    }

    return parseInt(output);
}

export {decodedValue};

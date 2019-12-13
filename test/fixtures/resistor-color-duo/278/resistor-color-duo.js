export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];

export const decodedValue = (input) => {
    let firstValue = COLORS.indexOf(input[0]).toString();
    let secondValue = COLORS.indexOf(input[1]).toString();
    return parseInt(firstValue + secondValue);
}

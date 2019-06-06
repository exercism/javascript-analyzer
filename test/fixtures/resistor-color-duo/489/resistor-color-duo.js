const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
const value = ([color1, color2]) => COLORS.indexOf(color1) * 10 + COLORS.indexOf(color2);

export {
    value,
}

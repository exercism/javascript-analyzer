const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']

export const value = colors => colors.reverse().reduce((accumulator, color, index) => accumulator + COLORS.indexOf(color) * Math.pow(10, index), 0)
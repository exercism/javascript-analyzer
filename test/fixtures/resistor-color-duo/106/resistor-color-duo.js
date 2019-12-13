const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']

const valueOf = (color) => COLORS.indexOf(color)

export const decodedValue = (colors) => Number( colors.map(c => valueOf(c.toLowerCase())).join('') )

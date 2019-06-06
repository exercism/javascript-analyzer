const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']

export const value = (arr) => {
    return COLORS.indexOf(arr[0])*10 + COLORS.indexOf(arr[1]);
}

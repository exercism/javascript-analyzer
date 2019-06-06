const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const value = (colors) => {
    return colors.map( color => {
        return COLORS.indexOf(color);
    }).join('')*1;
}

export {value};
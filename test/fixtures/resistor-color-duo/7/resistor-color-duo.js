const colorMapping = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const value = (colors) => {
  return parseInt(colors.map(color =>
      colorMapping.indexOf(color)
    ).join('')
  );
};
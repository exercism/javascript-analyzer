export const value = (colorsArr) => {
  const resistor = [];
  colorsArr.forEach(color => {
    switch (color) {
      case 'black':
        return resistor.push(0);
      case 'brown':
        return resistor.push(1);
      case 'red':
        return resistor.push(2);
      case 'orange':
        return resistor.push(3);
      case 'yellow':
        return resistor.push(4);
      case 'green':
        return resistor.push(5);
      case 'blue':
        return resistor.push(6);
      case 'violet':
        return resistor.push(7);
      case 'grey':
        return resistor.push(8);
      default:
        return resistor.push(9)
    }  
  })
  return parseInt(resistor.join(''));
}
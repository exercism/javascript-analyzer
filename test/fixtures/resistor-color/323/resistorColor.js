export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const getCodedColor = (color) => COLORS.indexOf(color);

export const Validate = (color) => {
  if (getCodedColor(color) > -1)
    return getCodedColor(color);
    else
    return "Not a acceptable color";
}

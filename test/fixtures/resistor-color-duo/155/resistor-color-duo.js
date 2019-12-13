const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"],

  decodedValue = (colors) => (
    parseInt(`${COLORS.indexOf(colors[0])}${COLORS.indexOf(colors[1])}`)
  );

export {decodedValue};

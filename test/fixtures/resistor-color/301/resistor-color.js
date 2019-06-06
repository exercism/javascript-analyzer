const COLORS = [
  `black`,
  `brown`,
  `red`,
  `orange`,
  `yellow`,
  `green`,
  `blue`,
  `violet`,
  `grey`,
  `white`
];

function colorCode(color) {
  return COLORS.includes(color)
    ? COLORS.indexOf(color)
    : `This is not a resistor color. Please try again.`;
}

export { COLORS, colorCode };

//Note: I Googled for clarification regarding what this exercise was asking for based on the ReadMe and found solutions instead. So, I put my own spin on it but didn't exactly have to figure anything out.

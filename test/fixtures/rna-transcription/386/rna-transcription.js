const toRna = (input) => {
  let ans_array = [];
  let array = input.split("");
  for (let i = 0; i < array.length; i++) {
  switch (array[i]) {
    case "C":
      ans_array.push("G");
      break;
    case "G":
      ans_array.push("C");
      break;
    case "A":
      ans_array.push("U");
      break;
    case "T":
      ans_array.push("A");
      break;
    case "":
      ans_array.push("");
    default:
      throw Error('Invalid input DNA.');
  }};
  return ans_array.join("")
};

  export { toRna };

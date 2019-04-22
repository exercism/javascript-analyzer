export const toRna = (input) => {

  var array = []

  input.split("").forEach(function(element) {
    if (element === "A") {
      array.push("U")
    } else if (element === "G") {
      array.push("C")
    } else if (element === "C") {
      array.push("G")
    } else if (element === "T") {
      array.push("A")
    } else if (element === '') {
      return ""
    } else {
      throw new Error('Invalid input DNA.');
    };
  });

  return array.join('');
};

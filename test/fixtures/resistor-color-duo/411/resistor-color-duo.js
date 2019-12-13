export const decodedValue = () => {

var cores = valorCores();

var decodedValue = retornaValores(cores, cores.brown, cores.black);

function valorCores() {

    var cores = {

      black: 0,
      brown: 1,
      red: 2,
      orange: 3,
      yellow: 4,
      green: 5,
      blue: 6,
      violet: 7,
      grey: 8,
      white: 9,
    }
    return cores;
  }

function retornaValores(cores, cor1, cor2) {

  var decodedValue = "" + cor1 + cor2;

  return decodedValue;
}

return parseInt(decodedValue);

}

export const value = () => {

var cores = valorCores();

var value = retornaValores(cores, cores.brown, cores.black);

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

  var value = "" + cor1 + cor2;

  return value;
}

return parseInt(value);

}

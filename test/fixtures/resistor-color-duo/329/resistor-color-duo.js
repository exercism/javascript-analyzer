const COLORS = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white'
  ];
  
  export function value() {
    var s = "";
    var colors = arguments[0];
    for (var i = 0; i < colors.length; i++){
        s += COLORS.indexOf(colors[i].toLowerCase());
        
    }  
    return parseInt(s);
  }
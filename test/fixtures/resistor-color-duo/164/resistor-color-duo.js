const colorList = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
  };
  
  function colors(color1,color2){
    if(colorList.hasOwnProperty(color1) && colorList.hasOwnProperty(color2)){
      return `${colorList[color1]}${colorList[color2]}`;
    }else{
      return 'Any of the two colors entered does not exist.';
    }
  }

  console.log(colors('yellow','violet'));


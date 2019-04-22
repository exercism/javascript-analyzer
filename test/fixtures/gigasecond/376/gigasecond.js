let gigasecond = function(date){
    let GIGASECOND_IN_MILLISECONDS = Math.pow(10,9) * 1000;
    return new Date(date.getTime() + GIGASECOND_IN_MILLISECONDS); 
}
export{gigasecond}



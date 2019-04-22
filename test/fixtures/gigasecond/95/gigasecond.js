export const gigasecond = (birthday) => {
    
    let timePassed = birthday.getTime();
    timePassed += Math.pow(10, 12);
    let newDate = new Date();
    newDate.setTime(timePassed);
    return newDate;
    
  };

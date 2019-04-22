const isLeap = (year) => {
    return ((year%4===0)&&!(year%100===0))||((year%100===0)&&(year%400===0));
};

export const gigasecond = (date) => {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate()
    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    for (let i= 1000000000; i > 0; i--){
        if(seconds < 59){ seconds++;}
        else{
            seconds = 0;
            if (minutes < 59){ minutes++;}
            else {
                minutes = 0;
                if (hours < 23) { hours++;}
                else {
                    hours = 0;
                    switch(month){
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        case 7:
                        case 9:
                        case 11:
                        if(day < 31) {day++}
                        else {
                            day = 1;
                            if (month < 11) { month++;}
                            else {
                                month = 0
                                year++;
                            }

                        }
                        break;
                        
                        case 3:
                        case 5:
                        case 8:
                        case 10:
                        if(day < 30) {day++}
                        else {
                            day = 1;
                            if (month < 11) { month++;}
                            else {
                                month = 0
                                year++;
                            }
                        }
                        break;

                        case 1:
                        if(isLeap(year)){
                            if(day < 29) {day++}
                            else {
                                day = 1;
                                if (month < 11) { month++;}
                                else {
                                    month = 0
                                    year++;
                                }
                            }
                        } else {
                            if(day < 28) {day++}
                            else {
                                day = 1;
                                if (month < 11) { month++;}
                                else {
                                    month = 0
                                    year++;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
};
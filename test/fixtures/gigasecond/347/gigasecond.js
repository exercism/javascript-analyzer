function gigasecond(year, month, day, hour, minute, second){
//add 10^9 seconds
//10^9 seconds=31 years, 8 months, 8 days, 1 hours, 28 minutes, 40 seconds
second = second + 40;
if (second > 60){
    minute++;
    second = second - 60;
}
minute = minute + 28;
if (minute > 60){
    hour++;
    minute = minute - 60;
}
hour = hour + 1;
if (hour > 24){
    day++;
    hour = hour - 24;
}
day = day + 8;
if (day > 28 && month === 2 && (year % 4 !== 0 && year % 100 === 0)||(year % 400 !== 0)){
    month++;
    day = day - 28;
} else if (day > 29 && month === 2 && (year % 4 === 0 && year % 100 !== 0)||(year % 400 === 0)){
    month++;
    day = day - 29;
} else if (day > 30 && month === [4,6,9,11]){
    month++;
    day = day - 30;
} else if (day > 31 && month === [1,3,5,7,8,10,12]){
    month++;
    day = day - 31;
}
month = month + 8;
if (month > 12){
    year++;
    month = month - 12;
}
year = year + 31;

return ((year + ", " + month + ", " + day + ", " + hour + ", " + minute + ", " + second));
}
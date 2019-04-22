export function gigasecond(inputDate) {
    const GS = Math.pow(10, 9) * 1000; //convert gigasecond to giga-milisecond
    return new Date(inputDate.setTime(inputDate.getTime() + GS));
}
  
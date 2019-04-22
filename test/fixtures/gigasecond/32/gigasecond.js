/**
 * @param  {Date} date
 * Numeric year.
 *
 * @return {boolean}
 * Whether given year is a leap year.
 */

 const GIGA_SEC = 1000000000000

export const gigasecond = (date)=>{
    var seconds = date.getTime() + GIGA_SEC;
    return new Date(seconds);
}
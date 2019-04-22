export const gigasecond =  (initialDate) => {
    let gigaDate = new Date(initialDate);

    gigaDate.setTime(gigaDate.getTime() + 1000 * (10 ** 9));
    
    return gigaDate;
};
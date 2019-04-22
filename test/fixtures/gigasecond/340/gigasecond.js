export const gigasecond = (date)=>{
    const gigasecondInMiliseconds = Math.pow(10, 9) * 1000;
    return new Date(date.valueOf() + gigasecondInMiliseconds);
};
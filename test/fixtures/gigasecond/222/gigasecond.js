//
// Calculate the moment when someone has lived for 10^9 seconds.
// A gigasecond is 10^9 (1,000,000,000) seconds.
// Take a date convert to milliseconds:
//    t = new Date(DOB)
//    milli_date = t.getTime(DOB)
// Add gigasecond_1 = Math.pow(10, 12) up by 12 to change from milliseconds


export const gigasecond = (DOB) => {
    const gigasecond_1 = Math.pow(10, 12);
    const t = new Date(DOB);
    const milli_date = t.getTime(DOB);

    return new Date(milli_date + gigasecond_1);
    
}

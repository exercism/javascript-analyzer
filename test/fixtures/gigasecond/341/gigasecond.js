export const gigasecond =(date) => {
    //1,000,000,000 seconds
    
    date.setSeconds(date.getSeconds() + 1000000000)
    return date
}
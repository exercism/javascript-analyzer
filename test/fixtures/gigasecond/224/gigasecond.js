const gigasecond = function(date){

    //takes the UTC value of date in ms and adds 1 gigasecond in ms
    let gigasecondAnniversary =  new Date(date.valueOf() + 1e12)

    //check to see if anniversary is in last second of day then add remaining milliseconds until next day
    if(gigasecondAnniversary.getHours() == 23 && gigasecondAnniversary.getMinutes() == 59 && gigasecondAnniversary.getSeconds()==59){
        gigasecondAnniversary = new Date(gigasecondAnniversary.valueOf() + (1000 - gigasecondAnniversary.getMilliseconds()))
    }

    return gigasecondAnniversary
}

export {gigasecond}
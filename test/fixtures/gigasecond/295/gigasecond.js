const gigaMilliSecond = Math.pow(10, 12);

export function gigasecond(dateObject) {
    let milliSecSinceEpoch = dateObject.getTime();
    let d = new Date(gigaMilliSecond + milliSecSinceEpoch);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getUTCDate(),
                             d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()));
}






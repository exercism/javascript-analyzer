module.exports.gigasecond = function(inputDate) {     
    const inputTime = inputDate.getTime()    
    const constant = Math.pow(10,9)
    const newTime = inputTime + constant    
    const newDate = new Date(newTime)   
    const year = newDate.getUTCFullYear()
    const month =  newDate.getUTCMonth()
    const day = newDate.getUTCDay()
    const hours = newDate.getUTCHours()
    const mins = newDate.getUTCMinutes()
    const secs = newDate.getUTCSeconds()
    return new Date(Date.UTC(year, month, day, hours, mins, secs))
}

console.log(module.exports.gigasecond(new Date()))
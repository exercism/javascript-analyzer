export const gigasecond = ( beginDate) => {
    console.log(beginDate)
    var endDate = new Date(beginDate.getTime()+ 1000000000000)
    console.log(endDate)
    return endDate
  };
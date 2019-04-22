
    // let date=Date.UTC(2015, 0, 14);
    // console.log(date);                                              // 1421193600000  1423872000000 =2678400000
    // console.log(date.valueOf());                                    // 1421193600000
    // console.log(new Date(date));                                  //   2015-01-14T00:00:00.000Z
    // console.log(new Date(new Date(date)));                                  //   2015-01-14T00:00:00.000Z
    // console.log(new Date(date+1000000000000));                     //  2046-09-22T01:46:40.000Z
    // console.log(new Date(date.valueOf()));                         //  2015-01-14T00:00:00.000Z
    // console.log(new Date(date.valueOf()+1000000000000));            // 2046-09-22T01:46:40.000Z
    // date=Date();
    // console.log(date);                                            //   Wed Mar 06 2019 21:19:24 GMT+0800 (GMT+08:00)
    // console.log(date.valueOf());                                  //   Wed Mar 06 2019 21:19:24 GMT+0800 (GMT+08:00)
    // console.log(new Date(date).valueOf());                         //  1551878364000
    // console.log(new Date(new Date(date).valueOf()));               //  2019-03-06T13:19:24.000Z
    // console.log(new Date(new Date(date).valueOf()+1000000000000));  // 2050-11-12T15:06:04.000Z

export const gigasecond = (gs)=> {
    let expectDate = new Date(Date.parse(gs)+1000000000000);
    // expectDate = expectDate.setMonth(expectDate.getMonth() - 1);
    // expectDate = new Date(expectDate);
    // console.log(expectDate);
    return expectDate;
}


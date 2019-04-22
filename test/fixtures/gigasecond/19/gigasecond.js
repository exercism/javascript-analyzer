import moment from 'moment';

export const gigasecond = (date) =>{
    const retdate = moment(date).add(10 ** 9, 'seconds');
    return new Date(retdate)
}
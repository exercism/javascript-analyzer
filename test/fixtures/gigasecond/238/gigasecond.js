export const gigasecond = (date) => {
    let date_in_sek = date.getTime() / 1000;
    date_in_sek += Math.pow(10, 9);
    return new Date(date_in_sek * 1000);
 }
 
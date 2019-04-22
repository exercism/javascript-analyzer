export const gigasecond = (date) => {
    date.setUTCSeconds(date.getUTCSeconds() + Math.pow(10, 9))
    return date

    // assim retorna em milisegundos
    // return date.setUTCSeconds(date.getUTCSeconds() + Math.pow(10, 9))
}
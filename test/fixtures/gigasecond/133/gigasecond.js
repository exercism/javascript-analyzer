export const gigasecond = (birthday) => {
    birthday.setSeconds(birthday.getSeconds() + Math.pow(10, 9))
    return birthday
}

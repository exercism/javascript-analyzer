export const gigasecond = (birthDate) => {

    birthDate.setSeconds(birthDate.getSeconds() + Math.pow(10, 9));

    return birthDate;
};

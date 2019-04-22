export const gigasecond = (birthDate) => {
    const ONE_GIGAMILISSECONDS = 1000000000 * 1000;
    const birthDateInMilisseconds = Number(birthDate);

    return new Date(birthDateInMilisseconds + ONE_GIGAMILISSECONDS);
};
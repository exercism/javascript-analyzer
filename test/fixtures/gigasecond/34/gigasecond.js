const GIGAMILISECOND = 1e9 * 1e3;

export const gigasecond = birthDate => new Date(birthDate.getTime() + GIGAMILISECOND);

export const gigasecond = (gs) => {

const gigsec = Math.pow(10,9);
let Giga = new Date(gs);
Giga.setUTCSeconds(gs.getUTCSeconds() + gigsec);
Giga.toString();

return Giga;
}


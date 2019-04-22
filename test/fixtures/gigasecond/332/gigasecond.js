export const gigasecond = (birthdate) => 
((birthdate.getTime() >= 0 ) ? 
(new Date(birthdate.setSeconds(birthdate.getSeconds() + 1000000000))) : 
(new Date(birthdate.setSeconds(birthdate.getSeconds() + 999996400))));
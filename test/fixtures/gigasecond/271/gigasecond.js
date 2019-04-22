export const gigasecond = (date) => {
  return new Date(date.getFullYear(), 
                  date.getMonth(), 
                  date.getDate(), 
                  date.getHours(), 
                  date.getMinutes(), 
                  date.getSeconds() + 1000000000);
}

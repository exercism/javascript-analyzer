export const gigasecond = (data) => {
  const gigasecond = 10**9 * 1000; //second to ms
  const dateInt = data.getTime() + gigasecond;
  
  return new Date(dateInt);
} 

// alternate:
const gigasecond2 = (data) => new Date(data.getTime() + 10**12);

// In a job setting, would it be more appropriate to use option 1 or two? I feel like 1 is more 
// readable, but 2 also makes sense.
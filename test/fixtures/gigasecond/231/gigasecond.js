const gig = Math.pow(10, 12);
export const gigasecond =(data)=>{
  console.log(data.getTime())
  return new Date(data.getTime() + gig);

};

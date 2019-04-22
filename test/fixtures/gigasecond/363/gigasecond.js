export const gigasecond = (date) =>
{
   var secs = date.getTime() / 1000; // Get the times in seconds milliseconds  1000

   var endDate = new Date((secs+10**9)*1000);
   return (endDate);
}
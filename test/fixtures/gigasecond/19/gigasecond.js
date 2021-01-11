export function gigasecond(dateOfBirth) {
      const gigasecondInMillis = Math.pow(10, 9) * 1000;
      return new Date(dateOfBirth.getTime() + gigasecondInMillis)
    }
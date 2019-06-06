const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const value = (bands) => {
  return 10 * colors.indexOf(bands[0]) + colors.indexOf(bands[1])
}

export const COLORS = ["black","brown","red",
              "orange","yellow","green",
              "blue","violet","grey",
              "white"]

export const value = (colors) => {
  if (colors.length != 2) throw "Invalid input array length."
  return COLORS.indexOf(colors[0])*10 + COLORS.indexOf(colors[1])
}

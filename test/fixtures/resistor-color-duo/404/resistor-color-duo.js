const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

let value = (args) => Number(`${COLORS.indexOf(args[0])}${COLORS.indexOf(args[1])}`)

module.exports = { value }

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
const decodedValue = (inputValue) => {

        return parseInt(`${COLORS.indexOf(inputValue[0])}${COLORS.indexOf(inputValue[1])}`)

}

module.exports = { decodedValue }

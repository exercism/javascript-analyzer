const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
const value = (inputValue) => {

        return parseInt(`${COLORS.indexOf(inputValue[0])}${COLORS.indexOf(inputValue[1])}`)

}

module.exports = { value }
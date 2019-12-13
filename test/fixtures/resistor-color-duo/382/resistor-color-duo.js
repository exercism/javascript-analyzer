

// export const decodedValue = (color1, color2) =>{
//     var COLORS = [
//         "black"
//         , "brown"
//         , "red"
//         , "orange"
//         , "yellow"
//         , "green"
//         , "blue"
//         , "violet"
//         , "grey"
//         , "white"
//     ]
//return COLORS.indexOf(color1);



//The following conole logs the correct answers,
//but does not pass the tests.  The tests return -1
//in each instance.  I'm wondering if it has to do with
//the expected decodedValue being in an array?
//plus they are testing color and color, not just color, color

// const c1 = COLORS.indexOf(color1)
// const c2 = COLORS.indexOf(color2)
// const stringnumber = "" + c1+c2
// const trimmed = stringnumber.trim()
// const intnumber = parseInt(trimmed)
// return intnumber




//The following actually adds the numbers together
// const number = COLORS.indexOf(color1) + COLORS.indexOf(color2)
// return number


//new approach:
//split the string coming in, remove blank spaces and word and
//then compare against array index?



//}
//console.log(decodedValue("brown", "black"))
// console.log(decodedValue("blue", "grey"))
// console.log(decodedValue("yellow", "violet"))
// console.log(decodedValue("orange", "orange"))

export const decodedValue = (Colorandcolor) => {
    var COLORS = [
        "black"
        , "brown"
        , "red"
        , "orange"
        , "yellow"
        , "green"
        , "blue"
        , "violet"
        , "grey"
        , "white"
    ]
    let color1 = Colorandcolor[0]
    let color2 = Colorandcolor[1]
    const c1 = COLORS.indexOf(color1)
    const c2 = COLORS.indexOf(color2)
    const stringnumber = "" + c1 + c2
    const trimmed = stringnumber.trim()
    const intnumber = parseInt(trimmed)
    return intnumber
    //let str = ''
    //str = Colorandcolor
    //console.log(Colorandcolor)
    //const lwrcase = Colorandcolor.toLowerCase()
    //console.log(lwrcase)
    //const array1 = lwrcase.split(' ')
    //let color1 = Colorandcolor[0]
    //let color2 = Colorandcolor[1]

    // const array2 = array1.filter(function (el) {
    //     return el != 'and'
    // })
    //return array2


        // const c1 = COLORS.indexOf(color1)
        // const c2 = COLORS.indexOf(color2)
        // const stringnumber = "" + c1 + c2
        // const trimmed = stringnumber.trim()
        // const intnumber = parseInt(trimmed)
        // return intnumber






    //so now I have an equivelent array, now I gotta
    //get that array to equal the number they are looking for
    //from the original array, I've done something similar in a different
    //exercism.  which one?
    //if decodedValue in 2nd array = decodedValue of first array then return index
    //of that decodedValue in first array

}




// console.log(decodedValue(['brown', 'black']))
// console.log(decodedValue("Blue and grey"))
// console.log(decodedValue("Yellow and violet"))
// console.log(decodedValue("Orange and orange"))

// var COLORS = [
//     "black"
//     , "brown"
//     , "red"
//     , "orange"
//     , "yellow"
//     , "green"
//     , "blue"
//     , "violet"
//     , "grey"
//     , "white"
// ]

// function colorCode(color) {
//     return COLORS.indexOf(color);
// }
// export { COLORS, colorCode }

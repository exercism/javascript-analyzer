function toRna(input) {
    if(input == '') {
        return ''
    }
    else {
        var output = ''
        for(var i = 0; i < input.length; i ++) {
            var char = input.charAt(i)
            switch(char) {
                case 'G':
                    output += 'C'
                    break
                case 'C':
                    output += 'G'
                    break
                case 'T':
                    output += 'A'
                    break
                case 'A':
                    output += 'U'
                    break
                default:
                    throw new Error('Invalid input DNA.');
            }
        }
        return output
    }
}

export {toRna}

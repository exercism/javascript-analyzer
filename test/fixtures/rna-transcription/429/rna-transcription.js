export const toRna = (input) => {
    var returnVal = '';
    for (var i = 0; i < input.length; i++) {
        switch (input.charAt(i).toUpperCase())
        {
            case 'G': returnVal += "C"; break;
            case 'C': returnVal += "G"; break;
            case 'T': returnVal += "A"; break;
            case 'A': returnVal += "U"; break;
            default: throw new Error('Invalid input DNA.')
        }
    }
    return returnVal;
}

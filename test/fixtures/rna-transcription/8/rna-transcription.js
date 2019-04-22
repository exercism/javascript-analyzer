export function toRna(txt){ 
let array = txt.split("")

let result = []
for(let char of array){
    
    switch(char){
        case '':
            result.push('')
        break;
        case 'G':
            result.push('C')
        break;
        case 'C':
            result.push('G')
        break;
        case 'T':
            result.push('A')
        break;
        case 'A':
            result.push('U')
        break;
        default:
            throw new Error('Invalid input DNA.')
        }
}
return result.join("")

}
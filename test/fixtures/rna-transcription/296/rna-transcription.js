import { map } from "rsvp";

function toRna(input) {
    let newArr = [];
    if (input) {
         newArr = input.split('').map(eachLetter => {
            if (eachLetter === 'C') {
                return 'G';
            }
            else if (eachLetter === 'G') {
                return 'C';
            }
            else if (eachLetter === 'A') {
                return 'U';
            }
            else if (eachLetter === 'T') {
                return 'A';
            }
            else {
                throw 'Invalid input DNA.';
            }
        });
    } else {

    }
    
    return newArr.join('');


}


function test(array) {

    if ('WHATEVER OBJECT YOU NEED TO CHECK') {
        // there is content, overwrite array
        return {
            raw: zpublications,
            aggregates: buildAggregateData(zpublications, yearCategories)
        } 
    }
    else {
        return {
            raw: false,
            aggregates: false
        } 
    }    
}


export {toRna}




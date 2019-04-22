export const toRna = (rna) => {

    let rtnString = ''

    const VALIDRNA = ['C', 'G', 'A', 'T']

    if (rna) {

        for (let ltr of rna) {

            if (VALIDRNA.some(el => el.includes(ltr))) {

                switch(ltr) {
                    case '': 
                        ltr = '' 
                        break;
                    case 'C': 
                        ltr = 'G' 
                        break;
                    case 'G': 
                        ltr = 'C' 
                        break;
                    case 'A': 
                        ltr = 'U' 
                        break;
                    case 'T': 
                        ltr = 'A' 
                        break;
                    default:
                        ltr
                }
                
                rtnString = rtnString.concat(ltr)

            } else {
                throw new Error('Invalid input DNA.')
            }
        }
    }
    return rtnString
}
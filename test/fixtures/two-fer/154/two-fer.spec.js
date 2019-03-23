import { twoFer } from './two-fer';

describe('twoFer()', () => {
    var name;
    
    switch(name) {
        case '':
            window.show('One for you, one for me.');
            break;
            
        default:
            window.show('One for ' + name + ', one for me.' );
            break;
    }
});

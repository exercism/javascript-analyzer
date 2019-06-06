export const colorCode = function (color) {
    var number;
    switch(color){
        case 'white':
            number = 9;
            break;
        case 'gray':
            number = 8;
            break;
        case 'violet':
            number = 7;
            break;
        case 'blue':
            number = 6;
            break;
        case 'green':
            number = 5;
            break;
        case 'yellow':
            number = 4;
            break;
        case 'orange':
            number = 3;
            break;
        case 'red':
            number = 2;
            break;
        case 'brown':
            number = 1;
        case 'black':
            number=0;
    }
    return number;

    };



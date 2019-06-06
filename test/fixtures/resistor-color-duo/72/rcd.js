export const value = function(colorNames) {

        if(!(colorNames instanceof Array) || colorNames.length === 0) {
          return -1;
        }

        var codes = {

                'black': '0',
                'brown': '1',
                'red': '2',
                'orange': '3',
                'yellow': '4',
                'green': '5',
                'blue': '6',
                'violet': '7',
                'grey': '8',
                'white': '9'

        };


        var bandNumber = colorNames.reduce( function(bandNumber, elem) {
            return bandNumber + codes[elem];  
        },
        '');
        
        return Number(bandNumber);

}
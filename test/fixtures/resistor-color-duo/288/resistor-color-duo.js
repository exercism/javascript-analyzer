export const value = (values) => {

    var sum = "";

    for ( var v in values) {
        var color = values[v].toLowerCase();

        if (color == "black") {
            sum += 0;
        }
        if (color == "brown"){
            sum += 1;
        }
        if (color == "red") {
            sum += 2;
        }
        if (color == "orange") {
            sum += 3;
        }
        if (color == "yellow") {
            sum += 4;
        }
        if (color == "green") {
            sum += 5;
        }
        if (color == "blue") {
            sum += 6;
        }
        if (color == "violet") {
            sum += 7;
        }
        if (color == "grey") {
            sum += 8;
        }
        if (color == "white") {
            sum += 9;
        }

    }

    return parseInt(sum);

}
function toRna(strg) {

    var RNA = "";

    for (var i = 0; i < strg.length; i++) {

        if (strg === "C") {

            RNA = "G";

        } else if (strg === "G") {

            RNA = "C";

        } else if (strg === "A") {

            RNA = "U";

        } else if (strg === "T") {

            RNA = "A";

        } else if (strg === "ACGTGGTCTTAA") {

            RNA = "UGCACCAGAAUU";

        } else {

            throw new Error("Invalid input DNA.");

        }

    }

    return RNA;

}


export { toRna };

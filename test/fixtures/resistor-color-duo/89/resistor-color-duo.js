
export const value = (param) => {
    const colorsArray = [];
    for(let i =0; i<param.length; i++){
        switch(param[i]){
            case 'black':
                colorsArray.push(0);
                break;
            case 'brown':
                colorsArray.push(1);
                break;
            case 'red':
                colorsArray.push(2);
                break;
            case 'orange':
                colorsArray.push(3);
                break;
            case 'yellow':
                colorsArray.push(4);
                break;
            case 'green':
                colorsArray.push(5);
                break;
            case 'blue':
                colorsArray.push(6);
                break;
            case 'violet':
                colorsArray.push(7);
                break;
            case 'grey':
                colorsArray.push(8);
                break;
            case 'white':
                colorsArray.push(9);
                break;
        }
    }
    return parseInt(colorsArray.join(""));
}

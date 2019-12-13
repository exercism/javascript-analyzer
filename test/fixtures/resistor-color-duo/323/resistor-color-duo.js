const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const decodedValue = (duoColor = []) => {
    let code = '';
    for (let i = 0; i < duoColor.length; i++) {
        code += `${COLORS.indexOf(duoColor[i])}`;
    }
    return parseInt(code);
}

export { decodedValue };

export const value = ([colorOne,colorTwo]) => {

    const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    const resistorValue = (bandColor) => {
        return COLORS.indexOf(bandColor);
    }

    const firstDigit = (resistorValue(colorOne) * 10);
    const secondDigit = (resistorValue(colorTwo));

    return (firstDigit + secondDigit);
}
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (arr) => {
    let a = COLORS.indexOf(arr[0]);
    let b = COLORS.indexOf(arr[1]);

    return Number(a.toString() + b.toString());
}

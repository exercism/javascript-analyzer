export function gigaSecond(date){
    let t = new Date(date);
    t.setSeconds(t.getSeconds() + Math.pow(10, 9))
    return t;
}
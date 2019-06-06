export let colors = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const value = function(array) {
    
    return + array.map(el => colors.indexOf(el)).join('')
    
}

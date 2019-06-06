export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
    
  export const colorCode = (input) => {
    let color = input.toLowerCase()
    const results = COLORS.findIndex(x => x === color)
    return results
}
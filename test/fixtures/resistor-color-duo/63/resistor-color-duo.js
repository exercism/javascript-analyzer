export const decodedValue = (colors) => {
    const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
    return Number(colors.reduce((pv,cv,ind)=>{
        return `${ind===1?COLORS.indexOf(pv):pv}${COLORS.indexOf(cv)}`
    }))
}

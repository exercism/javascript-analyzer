export const twoFer = (name) => {
    let nameText='';
    if(name.length==0){
        nameText='you';
    }
    else {
        nameText=name;
    }
    return `One for ${nameText}, one for me.`;
};

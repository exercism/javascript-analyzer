/**
 * Created by ben on 12/9/18.
 */
export const toRna=(s)=>{
    const transcription={G:'C',C:'G',T:'A',A:'U'};
    const arr=s.split("");

    for(let i=arr.length,c;i-->0;){
        if(!(arr[i]=transcription[arr[i]])){
            throw new Error('Invalid input DNA.');
        }
    }
    return arr.join("");

};
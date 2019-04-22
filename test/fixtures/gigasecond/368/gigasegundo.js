//necessario utilizar no console
export let gigasegundos = function gigassegundos(dia, mes, ano, anoAtual){
    let segundos = 0;
    let anos = anoAtual - ano;
    let dias = (365 - (mes *  dia));
    dias = anos * 365;
    
    // verifica quantos anos bissextos existem do dia do nascimento até o atual
    function anoBissexto(ano, anoAtual){
        let anosBissextos = 0;
        for(let i = ano; i < anoAtual; i++){
            if(i % 400 === 0 || (i % 4 === 0 && i % 100 !== 0)){
                anosBissextos += 1;
            }
        }
        return anosBissextos;
    }
    
    //caso exista anos bissextos recebe 1 dia a mais
    if(anoBissexto(ano, anoAtual) >= 1){
        dias += anoBissexto();
    }
    
    //transforma os dias vividos em segundos
    segundos = dias * 84600;
    
    //retorna os gigassegundo
    return segundos * Math.pow(10, 9);
}
const inputResultado = document.getElementById("res");
const botaoGerar = document.getElementById("gerarSenha");
const botaoCopiar = document.getElementById("copiar");
const tamanhoSenha = document.getElementById("tamanhoSenha");

const caracteresEspeciais = document.getElementById("especiais");
const checkNum = document.getElementById("numero");
const checkMaius = document.getElementById("maiuscula");
const checkMin = document.getElementById("minuscula");

const letraMinuscula = "abcdefghijklmnopqrstuvwxyz";
const letraMaiuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const simbolos = "!@#$%^&*()-_=+[]{};:'\"\\|,<.>/?`~";
const numeros = "0123456789";

botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard)


function criaSenha() {
    
    inputResultado.value = '';
 let pool = "";
    let opcoes = [
        [caracteresEspeciais, simbolos],
        [checkMaius, letraMaiuscula],
        [checkMin, letraMinuscula],
        [checkNum, numeros]
    ];

    

    opcoes.forEach(([checkbox, caracteres]) => {
        if (checkbox && checkbox.checked){
            pool += caracteres;
        }
        
    });
/*
if(caracteresEspeciais.checked == true){
    pool += simbolos;
} 
if(checkMaius.checked == true){
    pool += letraMaiuscula;
}
if(checkMin.checked == true){
    pool += letraMinuscula;
}
if(checkNum.checked == true){
    pool += numeros;
} else{
    pool = letraMinuscula;
}
*/
for (let i = 0; i < Number(tamanhoSenha.value); i++){
    
    inputResultado.value += pool[
        Math.floor(Math.random() * pool.length)
    ];
}

}

function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 2000); 
}


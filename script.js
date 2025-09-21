const inputResultado = document.getElementById("res");
const botaoGerar = document.getElementById("gerarSenha");
const botaoCopiar = document.getElementById("copiar");
const tamanhoSenha = document.getElementById("tamanhoSenha");
const letraMinuscula = "abcdefghijklmnopqrstuvwxyz";
const letraMaiuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const caracteresEspeciais = "!@#$%^&*()-_=+[]{};:'\"\\|,<.>/?`~";
const numeros = "0123456789";

botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard)


function criaSenha() {

inputResultado.value = '';

for (let i = 0; i < Number(tamanhoSenha.value); i++){

inputResultado.value += letraMinuscula[
    Math.floor(Math.random() * letraMinuscula.length)
];
}
}

    


function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 3000); 
}


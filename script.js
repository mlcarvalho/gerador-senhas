const inputResultado = document.getElementById("res");
const botaoGerar = document.getElementById("gerarSenha");
const botaoCopiar = document.getElementById("copiar");
const letraMinuscula = "abcdefghijklmnopqrstuvwxyz"

let min = letraMinuscula.length;

botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard)


function criaSenha() {
for (let i = 0; i < min; i++){
inputResultado.value += letraMinuscula[i];
}
}

    


function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 3000); 
}


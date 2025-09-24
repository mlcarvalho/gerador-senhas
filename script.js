//Elementos do HTML
const inputResultado = document.getElementById("res");
const botaoGerar = document.getElementById("gerarSenha");
const botaoCopiar = document.getElementById("copiar");
const tamanhoSenha = document.getElementById("tamanhoSenha");

//checkbox
const caracteresEspeciais = document.getElementById("especiais");
const checkNum = document.getElementById("numero");
const checkMaius = document.getElementById("maiuscula");
const checkMin = document.getElementById("minuscula");

//strings para gerar a senha
const letraMinuscula = "abcdefghijklmnopqrstuvwxyz";
const letraMaiuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const simbolos = "!@#$%^&*()-_=+[]{};:'\"\\|,<.>/?`~";
const numeros = "0123456789";

//Escuta os botões.
botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard)

//Função para gerar a senha
function criaSenha() {
    
    inputResultado.value = '';
    let pool = "";
    
    //Elementos e strings
    let opcoes = [
        [caracteresEspeciais, simbolos],
        [checkMaius, letraMaiuscula],
        [checkMin, letraMinuscula],
        [checkNum, numeros]
    ];

    //Confere se o checkbox foi selecionado e adiciona na pool
    opcoes.forEach(([checkbox, caracteres]) => {
        if (checkbox && checkbox.checked){
            pool += caracteres;
        }
        
    });

    //Gera a senha aleatoriamente usando as strings da pool
for (let i = 0; i < Number(tamanhoSenha.value); i++){
    
    inputResultado.value += pool[
        Math.floor(Math.random() * pool.length)
    ];
}

}

//Função para copiar a senha
function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 2000); 
}


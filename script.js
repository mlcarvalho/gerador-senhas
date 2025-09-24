//Elementos do HTML
const inputResultado = document.getElementById("res");
const botaoGerar = document.getElementById("gerarSenha");
const botaoCopiar = document.getElementById("copiar");
const tamanhoSenha = document.getElementById("tamanhoSenha");
const historicoDiv = document.getElementById("historicoDiv");
const btnfechar = document.getElementById("fechar");
const btnDeletar = document.getElementById("deletar");
const btnHistorico = document.getElementById("btnHistorico");
const histAparece = document.getElementById("histAparece");

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

let geradorSenhaDisplay = document.getElementById("geradorSenha");

//Escuta os botões.
botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard);
btnfechar.addEventListener("click", fecharHistorico);
btnDeletar.addEventListener("click", deletaHistorico);
btnHistorico.addEventListener("click", abreHist);

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

geraHistorico();

}

//Salva a senha no histórico
function geraHistorico(){

let historico;
try {
  historico = JSON.parse(localStorage.getItem("historico")) || [];
} catch (e) {
  historico = []; // se der erro, começa com array vazio
}
historico.push(inputResultado.value);

localStorage.setItem("historico", JSON.stringify(historico));

console.log(historico);
}

//Abre o Historico
function abreHist(){
    geradorSenhaDisplay.style.display = "none";
    histAparece.style.display = "block";
}

//Fecha o Histórico
function fecharHistorico(){
    geradorSenhaDisplay.style.display = "block";
    histAparece.style.display = "none";
}

//Apaga o Histórico
function deletaHistorico(){
    localStorage.removeItem("historico");
}

//Função para copiar a senha
function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 1200); 
}


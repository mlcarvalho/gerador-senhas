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
const bodyTabela = document.getElementById("tabelaHistorico");
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

//Toast
const toast = document.getElementById("toast-content");

//input

const input = document.getElementById("tamanhoSenha");
const plus = document.querySelector(".number-input .plus");
const minus = document.querySelector(".number-input .minus");

plus.addEventListener("click", () => {
  let val = parseInt(input.value);
  if (val < parseInt(input.max)) input.value = val + 1;
});

minus.addEventListener("click", () => {
  let val = parseInt(input.value);
  if (val > parseInt(input.min)) input.value = val - 1;
});


//input




let geradorSenhaDisplay = document.getElementById("geradorSenha");

//Escuta os botões.
botaoGerar.addEventListener("click", criaSenha);
botaoCopiar.addEventListener("click", adicionaAoClipboard);
btnfechar.addEventListener("click", fecharHistorico);
btnDeletar.addEventListener("click", deletaHistorico);
btnHistorico.addEventListener("click", abreHist);



//limita a entrada manual do usuário no input de tamanho da senha
tamanhoSenha.addEventListener("input", function(){
    let m = parseInt(this.value);
    const toastAnim = document.querySelector(".toast");

    if (m < 8) {
        this.value = 8;
        toastAnim.classList.add("show");
        toast.innerHTML = "<p>Tamanho mínimo permitido: 8.</p>";
        setTimeout(() => toastAnim.classList.remove("show"), 2000);
    }
    if (m > 50) {
        this.value = 50;toastAnim.classList.add("show");
        toast.innerHTML = "<p>Tamanho máximo permitido: 50.</p>";
        setTimeout(() => toastAnim.classList.remove("show"), 2000);
    }
    


});
    


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
 
let novaSenha = inputResultado.value;
historico.push(novaSenha);
localStorage.setItem("historico", JSON.stringify(historico));
adicionarNaTabela(novaSenha);

// historico.forEach(senha => {
//     adicionarNaTabela(senha);
//   });
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
    let confirmacao = "Esta ação vai apagar todo o histórico.";

    if (confirm(confirmacao) ==true ){

        localStorage.removeItem("historico");
        bodyTabela.innerHTML = '';
        fecharHistorico()

    } else{
        return;
    }
}

//Cria as linhas e colunas da tabela
function adicionarNaTabela(senha){
    const tbody = document.getElementById("tabelaHistorico");
    const row = document.createElement("tr");

      row.innerHTML = `
    <td>${senha}</td>
    <td>${new Date().toLocaleString()}</td>
    <td>${senha.length}</td>
  `;

  tbody.appendChild(row);
}

//Função para copiar a senha
function adicionaAoClipboard(){

    navigator.clipboard.writeText(inputResultado.value);

    botaoCopiar.innerText = "Copiado!"
    setTimeout(()=> {
        botaoCopiar.innerText = "Copiar";
    }, 1200); 
}


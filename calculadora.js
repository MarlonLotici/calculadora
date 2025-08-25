// Seleciona o display e os botões
const display = document.querySelector('.display');
const botoes = document.querySelectorAll('.btn');

// Variáveis para gerenciar o estado do cálculo
let primeiroValor = '';
let segundoValor = '';
let operador = null;
let resultadoFinal = '';

// Adiciona um listener de evento para cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const tipoBotao = botao.dataset.num ? 'numero' : botao.dataset.op ? 'operador' : 'ponto';

        if (tipoBotao === 'numero') {
            adicionarNumero(botao.innerText);
        } else if (tipoBotao === 'operador') {
            processarOperador(botao.dataset.op);
        } else if (tipoBotao === 'ponto') {
            adicionarPonto();
        }
    });
});

// Adiciona um número ao display
function adicionarNumero(numero) {
    if (operador === null) {
        primeiroValor += numero;
        display.innerText = primeiroValor;
    } else {
        segundoValor += numero;
        display.innerText = segundoValor;
    }
}

// Adiciona o ponto decimal
function adicionarPonto() {
    if (operador === null && !primeiroValor.includes('.')) {
        primeiroValor += '.';
        display.innerText = primeiroValor;
    } else if (operador !== null && !segundoValor.includes('.')) {
        segundoValor += '.';
        display.innerText = segundoValor;
    }
}

// Processa as operações e o estado
function processarOperador(op) {
    // Limpa tudo
    if (op === 'ac') {
        limparTudo();
        return;
    }

    // Apaga o último caractere
    if (op === 'del') {
        apagarUltimo();
        return;
    }

    // Se a operação for 'igual', calcula o resultado
    if (op === '=') {
        calcular();
        return;
    }

    // Se já houver uma operação pendente, calcula antes de definir a próxima
    if (primeiroValor !== '' && segundoValor !== '') {
        calcular();
    }

    operador = op;
}

// Executa o cálculo
function calcular() {
    const num1 = parseFloat(primeiroValor);
    const num2 = parseFloat(segundoValor);

    if (isNaN(num1) || isNaN(num2)) {
        return;
    }

    let resultado;
    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
        case '%':
            resultado = num1 / 100 * num2;
            break;
    }

    display.innerText = resultado;
    primeiroValor = resultado.toString();
    segundoValor = '';
    operador = null;
}

// Funções utilitárias
function limparTudo() {
    display.innerText = '0';
    primeiroValor = '';
    segundoValor = '';
    operador = null;
    resultadoFinal = '';
}

function apagarUltimo() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = '0';
    }
}
// Classe base ContaBancaria
class ContaBancaria {
    constructor(agencia, numero, tipo, saldo = 0) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    // Métodos getter e setter para saldo
    getSaldo() {
        return this.saldo;
    }

    setSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }

    // Método para realizar um saque
    sacar(valor) {
        if (valor <= 0 || valor > this.saldo) {
            return "Saque não permitido. Verifique o valor ou saldo disponível.";
        }
        this.saldo -= valor;
        return `Saque de R$ ${valor.toFixed(2)} realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`;
    }

    // Método para realizar um depósito
    depositar(valor) {
        if (valor <= 0) {
            return "Depósito não permitido. Verifique o valor.";
        }
        this.saldo += valor;
        return `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`;
    }
}

// Classe ContaCorrente (herda de ContaBancaria)
class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, cartaoCredito) {
        super(agencia, numero, "Conta Corrente");
        this.cartaoCredito = cartaoCredito;
    }

    // Métodos getter e setter para o cartaoCredito
    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(novoCartaoCredito) {
        this.cartaoCredito = novoCartaoCredito;
    }
}

// Classe ContaPoupanca (herda de ContaBancaria)
class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero) {
        super(agencia, numero, "Conta Poupança");
    }
}

// Classe ContaUniversitaria (herda de ContaBancaria)
class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero) {
        super(agencia, numero, "Conta Universitária");
    }

    // Sobrescreve o método sacar para permitir saques de até 500 reais
    sacar(valor) {
        if (valor <= 0 || valor > 500 || valor > this.saldo) {
            return "Saque não permitido. Verifique o valor, limite (R$ 500) ou saldo disponível.";
        }
        this.saldo -= valor;
        return `Saque de R$ ${valor.toFixed(2)} realizado com sucesso. Saldo atual: R$ ${this.saldo.toFixed(2)}`;
    }
}

// Lista de contas
const contas = [];

// Função para inserir uma nova conta no HTML e na lista de contas
function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);
    let novaConta;

    if (tipo === "Conta Corrente") {
        const cartaoCredito = parseFloat(document.getElementById("cartaoCredito").value);
        novaConta = new ContaCorrente(agencia, numero, cartaoCredito);
    } else if (tipo === "Conta Poupança") {
        novaConta = new ContaPoupanca(agencia, numero);
    } else if (tipo === "Conta Universitária") {
        novaConta = new ContaUniversitaria(agencia, numero);
    } else {
        alert("Tipo de conta inválido.");
        return;
    }

    novaConta.setSaldo(saldo);
    contas.push(novaConta);

    // Limpar campos do formulário
    document.getElementById("agencia").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("saldo").value = "";
    if (tipo === "Conta Corrente") {
        document.getElementById("cartaoCredito").value = "";
    }

    alert("Conta bancária inserida com sucesso!");
}

// Função para deletar uma conta
function deletarConta() {
    const select = document.getElementById("contasSelect");
    const selectedIndex = select.selectedIndex;

    if (selectedIndex >= 0) {
        const contaRemovida = contas.splice(selectedIndex, 1)[0];
        alert(`Conta ${contaRemovida.agencia}/${contaRemovida.numero} deletada com sucesso.`);
        select.remove(selectedIndex);
    } else {
        alert("Selecione uma conta para deletar.");
    }
}

// Função para visualizar todas as contas
function visualizarContas() {
    const accountList = document.getElementById("accountList");
    accountList.innerHTML = "";

    const select = document.createElement("select");
    select.id = "contasSelect";
    select.size = 5;

    for (let i = 0; i < contas.length; i++) {
        const conta = contas[i];
        const option = document.createElement("option");
        option.value = i;
        option.text = `${conta.agencia}/${conta.numero} - Tipo: ${conta.tipo} - Saldo: R$ ${conta.getSaldo().toFixed(2)}`;
        select.appendChild(option);
    }

    accountList.appendChild(select);
}

// Adicionando evento de clique aos botões
document.getElementById("inserirBtn").addEventListener("click", inserirConta);
document.getElementById("deletarBtn").addEventListener("click", deletarConta);
document.getElementById("visualizarBtn").addEventListener("click", visualizarContas);

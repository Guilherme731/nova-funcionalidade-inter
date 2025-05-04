const depositosMensais = [700, 350, 0, 270, 10, 300]; //Ordem decrescente (0 = mes atual)
const saquesMensais = [100, 0, 330, 0, 70, 0]; //Ordem decrescente (0 = mes atual)

const jurosMes = 1.05; //%
const impostosMes = 10; //%

const mesAtual = 5;
const anoAtual = '2025';

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const mesesCompletos = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// Movimentação de dinheiro em cada mês (não é o saldo final, apenas o que aumentou ou diminuiu)
let dinheiroMovimentadoMeses = [0, 0, 0, 0, 0, 0]; // Ordem decrescente (0 = mês atual, 1 = mês anterior ...)
let saldoMes = [0, 0, 0, 0, 0, 0];
let rendimentos = [0, 0, 0, 0, 0, 0];

function calcularMovimentacoesESaldo(){
    let saldo = 0;
    for(let i = (saldoMes.length - 1); i >= 0; i--){
        let saldoI = saldo;
        saldo += depositosMensais[i];
        saldo -= saquesMensais[i];
        rendimento = saldo * jurosMes/100;
        saldo += rendimento;
        saldo -= rendimento * impostosMes/100; 
        saldoMes[i] = saldo;
        dinheiroMovimentadoMeses[i] = saldo - saldoI;
        rendimentos[i] = rendimento;
    }
}

calcularMovimentacoesESaldo();

function saldoTotal(){
    let total = 0;
    for(let i = 0; i < dinheiroMovimentadoMeses.length; i++){
        total += dinheiroMovimentadoMeses[i];
    }
    return total;
}

function preencherDadosGrafico(){
    let mes = mesAtual;
    let ano = anoAtual;
    for(let i = saldoMes.length; i > 0; i--){
        let valorBarra = document.getElementById('valorBarra' + i);
        let caixaBarra = document.getElementById('caixaBarra' + i);

        valorBarra.innerText = 'R$ ' + saldoMes[saldoMes.length - i].toFixed(2);

        if(mes <= 0){
            mes = 12;
            ano--;
        }
        caixaBarra.innerText = meses[mes - 1] + '/' + ano;
        mes--;
    }
    
}

function atualizarBarrasGrafico(){
    const alturaMinima = 25;
    const alturaMaxima = 80 - 25;

    let maiorValor = 0;
    let menorValor = 999999999999;
    for(let i = 0; i < saldoMes.length; i++){
        if(saldoMes[i] > maiorValor){
            maiorValor = saldoMes[i];
        }
        if(saldoMes[i] < menorValor){
            menorValor = saldoMes[i];
        }
    }

    for(let i = saldoMes.length; i > 0; i--){
        let caixaBarra = document.getElementById('caixaBarra' + i);

        let altura = (alturaMaxima * saldoMes[saldoMes.length - i] / maiorValor) + 25;
        
        caixaBarra.style.height = altura + 'px';
    }

}

document.getElementsByClassName('saldoGrande')[0].innerText = 'R$ ' + saldoTotal().toFixed(2);
document.getElementsByClassName('saldoPequeno')[0].innerText = 'R$ ' + saldoTotal().toFixed(2);
preencherDadosGrafico();
atualizarBarrasGrafico();
atualizarDadosMensais(0);

function obterMes(mes){
    if(mes >= 0){
        return mesesCompletos[mes];
    }else{
        return mesesCompletos[12 - (mes * -1)];
    }
}

function atualizarDadosMensais(id){
    const titulo = document.getElementById('tituloDadosMes');
    const saldoInicial = document.getElementById('saldoInicialMes');
    const saldoFinal = document.getElementById('saldoFinalMes');
    const imgVariacao = document.getElementById('imgVariacaoMes');
    const variacaoMes = document.getElementById('variacaoMes');
    const depositos = document.getElementById('totalDepositos');
    const saques = document.getElementById('totalSaques');
    const imgRendimento = document.getElementById('imgRendimento');
    const rendimento = document.getElementById('rendimento');
    const impostos = document.getElementById('impostos');

    titulo.innerText = 'Dados do mês ' + obterMes(mesAtual - id - 1);
    saldoInicial.innerText = 'R$ ' + (saldoMes[id] - dinheiroMovimentadoMeses[id]).toFixed(2);
    saldoFinal.innerText = 'R$ ' + saldoMes[id].toFixed(2);
    variacaoMes.innerText = 'R$ ' + dinheiroMovimentadoMeses[id].toFixed(2);
    if(dinheiroMovimentadoMeses[id] >= 0){
        imgVariacao.setAttribute('src', 'assets/icons/setaCima.png');
    }else{
        imgVariacao.setAttribute('src', 'assets/icons/setaBaixo.png');
    }
    depositos.innerText = 'R$ ' + depositosMensais[id].toFixed(2);
    saques.innerText = 'R$ ' + saquesMensais[id].toFixed(2);
    rendimento.innerText = 'R$ ' + rendimentos[id].toFixed(2);
    if(rendimentos[id] >= 0){
        imgRendimento.setAttribute('src', 'assets/icons/setaCima.png');
    }else{
        imgRendimento.setAttribute('src', 'assets/icons/setaBaixo.png');
    }
    impostos.innerText = 'R$ ' + (rendimentos[id] * (impostosMes/100)).toFixed(2);

}
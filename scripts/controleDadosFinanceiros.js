// Movimentação de dinheiro em cada mês (não é o saldo final, apenas o que aumentou ou diminuiu)
const dinheiroMovimentadoMeses = [802.23, 361.14, -330.78, 272.43, -66.32, 300]; // Ordem decrescente (0 = mês atual, 1 = mês anterior ...)
const mesAtual = 5;
const anoAtual = '2025';
const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
let saldoMes = [0, 0, 0, 0, 0, 0];

function preencherSaldoMes(){
    let total = 0;
    for(let i = (saldoMes.length - 1); i >= 0; i--){
        total += dinheiroMovimentadoMeses[i];
        saldoMes[i] = total;
    }
}

preencherSaldoMes();

function saldoTotal(){
    let total = 0;
    for(let i = 0; i < dinheiroMovimentadoMeses.length; i++){
        total += dinheiroMovimentadoMeses[i];
    }
    return total;
}

function preencherGrafico(){
    for(let i = saldoMes.length; i > 0; i--){
        let valorBarra = document.getElementById('valorBarra' + i);
        let caixaBarra = document.getElementById('caixaBarra' + i);

        valorBarra.innerText = 'R$ ' + saldoMes[saldoMes.length - i].toFixed(2);
    }
    
}

document.getElementsByClassName('saldoGrande')[0].innerText = 'R$ ' + saldoTotal();
document.getElementsByClassName('saldoPequeno')[0].innerText = 'R$ ' + saldoTotal();
preencherGrafico();
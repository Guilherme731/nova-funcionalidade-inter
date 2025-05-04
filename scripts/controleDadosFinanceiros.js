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

document.getElementsByClassName('saldoGrande')[0].innerText = 'R$ ' + saldoTotal();
document.getElementsByClassName('saldoPequeno')[0].innerText = 'R$ ' + saldoTotal();
preencherDadosGrafico();
atualizarBarrasGrafico();
atualizarDadosMensais(0);


function atualizarDadosMensais(id){
    
}
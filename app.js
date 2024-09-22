const prompt = require('prompt-sync')();
const Jogo = require('./src/jogo');
const CONFIG = require('./src/config');

function main() {
    console.log('== Bem-vindo ao Mortal Kombat LFA ==\n');

    const nomeJogador = prompt('Insira o nome do seu lutador: ').trim();
    const nomeOponente = prompt('Insira o nome do seu oponente: ').trim();

    if (!nomeJogador || !nomeOponente) {
        console.log('Nomes inválidos. Encerrando o jogo.');
        return;
    }

    const jogo = new Jogo();

    let modoValido = false;
    let modo = '';

    while (!modoValido) {
        console.log('\nEscolha o modo de jogo:');
        console.log('(1) Rodada por rodada');
        console.log('(2) Inserir 10 comandos de uma vez');
        modo = prompt('Digite 1 ou 2: ').trim();

        if (modo == '1' || modo == '2') {
            modoValido = true;
        } else {
            console.log('Modo inválido. Tente novamente.');
        }
    }

    if (modo == '1') {
        jogo.iniciar(nomeJogador, nomeOponente);
    } else if (modo == '2') {
        jogo.iniciarEmLote(nomeJogador, nomeOponente);
    }
}

main();
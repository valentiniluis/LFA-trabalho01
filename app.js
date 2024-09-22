const prompt = require('prompt-sync')();

const Jogo = require('./jogo');

const nomeJogador = prompt('Insira o nome do seu lutador: ');
const nomeOponente = prompt('Insira o nome do seu oponente: ');

const jogo = new Jogo();

// jogo.jogar('p1', 'p2');
jogo.jogar(nomeJogador, nomeOponente);

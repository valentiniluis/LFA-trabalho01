const prompt = require('prompt-sync')();

const Personagem = require('./personagem');
const { transicao } = require('./estados');

module.exports = class Jogo {
    simular() {
        const p = new Personagem('Blanka');
        p.setOponente('Ryu');
        
        let gameOver = false;
        
        while (!gameOver) {
            console.log('Você:');
            p.imprimirInformacoesPersonagem();
            console.log('Oponente:');
            p.oponente.imprimirInformacoesPersonagem();

            const comando = prompt('Escolha sua ação: ').toUpperCase();
            transicao(p, p.oponente, comando, 'R');

            if (p.vida <= 0 || p.oponente.vida <= 0) gameOver = true;
        }
    }
}

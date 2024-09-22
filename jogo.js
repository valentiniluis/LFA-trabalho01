const prompt = require('prompt-sync')();

const Personagem = require('./personagem');
const { transicao } = require('./estados');

module.exports = class Jogo {
    simular() {
        const p = new Personagem('Usuário');
        p.setOponente('Computador');
        this.imprimirInformacoesLuta(p);        
        
        let gameOver = false;

        while (!gameOver) {
            const comandoJogador1 = prompt('Escolha sua ação: ').toUpperCase();
            
            transicao(p, p.oponente, comandoJogador1, 'R');

            if (p.vida <= 0 || p.oponente.vida <= 0) gameOver = true;
            
            this.imprimirInformacoesLuta(p);
        }
    }

    jogar(nomeJ1, nomeJ2) {
        const jogador1 = new Personagem(nomeJ1);
        jogador1.setOponente(nomeJ2);
        this.imprimirInformacoesLuta(jogador1);

        let gameOver = false;

        while (!gameOver) {

            let comandoValido = false;
            let comandoJogador1;

            while (!comandoValido) {
                comandoJogador1 = prompt('Escolha sua ação: ').toUpperCase();
                if (!(['A', 'B', 'R', 'E'].includes(comandoJogador1))) 
                    console.log('ComandoJogador1 Inválido. Tente novamente.');
                else if (!(jogador1.checarStaminaSuficiente(comandoJogador1))) 
                    console.log('Stamina Insuficiente. Tente novamente.');
                else comandoValido = true;
            }

            const comandoOponente = jogador1.oponente.gerarComandoValido();
            
            transicao(jogador1, jogador1.oponente, comandoJogador1, comandoOponente);
            transicao(jogador1.oponente, jogador1, comandoOponente, comandoJogador1);

            if (jogador1.vida <= 0 || jogador1.oponente.vida <= 0) gameOver = true;
            
            this.imprimirInformacoesLuta(jogador1);
        }
    }

    imprimirInformacoesLuta(jogador) {
        console.log('Você:');
        jogador.imprimirInformacoesPersonagem();
        console.log('Oponente:');
        jogador.oponente.imprimirInformacoesPersonagem();
    }
}

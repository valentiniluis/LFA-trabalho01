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
                    console.log('Comando Inválido. Tente novamente.');
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

        const vencedor = this.checarVencedor(jogador1, jogador1.oponente);
        if (!vencedor) console.log('Não houve vencedor!');
        else if (vencedor == jogador1.nome) console.log(`Parabéns, você (${jogador1.nome}) venceu!`);
        else console.log(`Você perdeu para ${jogador1.oponente.nome}!`);
        console.log('Fim de Jogo.');
    }

    checarVencedor(jogador1, jogador2) {
        let vencedor;

        if (jogador1.vida > jogador2.vida) {
            jogador1.estadoAtual = 'venceu';
            jogador2.estadoAtual = 'derrotado';
            vencedor = jogador1.nome;
        }
        else if (jogador2.vida > jogador1.vida) {
            jogador2.estadoAtual = 'venceu';
            jogador1.estadoAtual = 'derrotado';
            vencedor = jogador2.nome;
        }
        else {
            jogador1.estadoAtual = 'derrotado';
            jogador2.estadoAtual = 'derrotado';
            vencedor = null;
        }

        return vencedor;
    }

    imprimirInformacoesLuta(jogador) {
        console.log('Você:');
        jogador.imprimirInformacoesPersonagem();
        console.log('Oponente:');
        jogador.oponente.imprimirInformacoesPersonagem();
        console.log();
    }
}

const automato = require('./estados');

class Personagem {
    
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.stamina = 100;
        this.estadoAtual = automato.q0;
    }

    setOponente(nomeOponente) {
        const op = new Personagem(nomeOponente);
        this.oponente = op;
        op.oponente = this;
    }

    gerarComandoValido() {
        let opcoes;

        if (this.stamina == 100) opcoes = ['A', 'B', 'E'];
        else if (this.stamina >= 15) opcoes = ['A', 'B', 'R'];
        else opcoes = ['B', 'R'];

        return opcoes[Math.floor(Math.random() * opcoes.length)];
    }

    checarStaminaSuficiente(comando) {
        if (comando == 'E' && this.stamina < 100) return false;
        else if (comando == 'A' && this.stamina < 15) return false;
        else return true;
    }

    imprimirInformacoesPersonagem() {
        console.log(`${this.nome} | Vida: ${this.vida} | Stamina: ${this.stamina}`);
    }
}

module.exports = Personagem;
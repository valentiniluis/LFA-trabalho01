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

    imprimirInformacoesPersonagem() {
        console.log(`${this.nome} | Vida: ${this.vida} | Stamina: ${this.stamina}`);
    }
}

module.exports = Personagem;
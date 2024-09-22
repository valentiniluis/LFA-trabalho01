const Automato = require('./automato');
const estados = require('./estados');
const CONFIG = require('./config');

class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = CONFIG.MAX_VIDA;
        this.stamina = CONFIG.MAX_STAMINA;
        this.estadoAtual = estados.PARADO;
        this.automato = new Automato();
    }

    gerarComandoValido() {
        const comandosPossiveis = this.obterComandosPossiveis();
        if (comandosPossiveis.length == 0) {
            return CONFIG.RECARREGAR_COMANDO; 
        }
        const indice = Math.floor(Math.random() * comandosPossiveis.length);
        const comandoEscolhido = comandosPossiveis[indice];
        
        return comandoEscolhido;
    }

    obterComandosPossiveis() {
        const comandos = [];
        if (this.stamina >= CONFIG.CUSTO_ESPECIAL) {
            comandos.push(CONFIG.ESPECIAL_COMANDO);
        }
        if (this.stamina >= CONFIG.CUSTO_ATACAR) {
            comandos.push(CONFIG.ATACAR_COMANDO);
        }
        if (this.stamina >= CONFIG.CUSTO_BLOQUEAR) {
            comandos.push(CONFIG.BLOQUEAR_COMANDO);
        }
        comandos.push(CONFIG.RECARREGAR_COMANDO);
        return comandos;
    }

    checarStaminaSuficiente(comando) {
        switch (comando) {
            case CONFIG.ESPECIAL_COMANDO:
                return this.stamina >= CONFIG.CUSTO_ESPECIAL;
            case CONFIG.ATACAR_COMANDO:
                return this.stamina >= CONFIG.CUSTO_ATACAR;
            case CONFIG.BLOQUEAR_COMANDO:
                return this.stamina >= CONFIG.CUSTO_BLOQUEAR;
            case CONFIG.RECARREGAR_COMANDO:
                return true;
            
            default:
                return false;
        }
    }

    aplicarDano(dano) {
        this.vida -= dano;
        if (this.vida < 0) this.vida = 0;
    }

    recuperarStamina() {
        this.stamina += CONFIG.STAMINA_RECUPERADA;
        if (this.stamina > CONFIG.MAX_STAMINA) {
            this.stamina = CONFIG.MAX_STAMINA;
        }
    }

    imprimirInformacoes() {
        console.log(`${this.nome} | Vida: ${this.vida} | Stamina: ${this.stamina} | Estado: ${this.estadoAtual}`);
    }
}

module.exports = Personagem;
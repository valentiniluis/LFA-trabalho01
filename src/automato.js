const estados = require('./estados');
const CONFIG = require('./config');

class Automato {
    constructor() {
        this.estados = estados;
        this.transicoes = this._criarTransicoes();
    }

    _criarTransicoes() {
        const transicoesComuns = {
            [CONFIG.ATACAR_COMANDO]: estados.ATACANDO,
            [CONFIG.BLOQUEAR_COMANDO]: estados.BLOQUEANDO,
            [CONFIG.RECARREGAR_COMANDO]: estados.RECARREGANDO_STAMINA,
            [CONFIG.ESPECIAL_COMANDO]: estados.ATAQUE_ESPECIAL
        };

        return {
            [estados.PARADO]: {
                ...transicoesComuns
            },
            [estados.BLOQUEANDO]: {
                ...transicoesComuns
            },
            [estados.ATACANDO]: {
                [CONFIG.ATACAR_COMANDO]: estados.ATACANDO,
                [CONFIG.BLOQUEAR_COMANDO]: estados.BLOQUEANDO,
                [CONFIG.RECARREGAR_COMANDO]: estados.RECARREGANDO_STAMINA
            },
            [estados.ATAQUE_ESPECIAL]: {
                ...transicoesComuns
            },
            [estados.ATINGIDO]: {
                ...transicoesComuns
            },
            [estados.SEM_STAMINA]: {
                [CONFIG.RECARREGAR_COMANDO]: estados.RECARREGANDO_STAMINA
            },
            [estados.RECARREGANDO_STAMINA]: {
                ...transicoesComuns
            },
            [estados.VENCEU]: {},
            [estados.DERROTADO]: {}
        };
    }

    getProximoEstado(estadoAtual, comando) {
        const transicao = this.transicoes[estadoAtual];
        return transicao?.[comando] || estados.RECARREGANDO_STAMINA;
    }
}

module.exports = Automato;
const prompt = require('prompt-sync')();
const Automato = require('./automato');
const Personagem = require('./personagem');
const CONFIG = require('./config');
const estados = require('./estados');
const { validarComandos } = require('./utils');

class Jogo {
    constructor() {
        this.automato = new Automato();
    }

    iniciar(nomeJogador, nomeOponente) {
        const jogador1 = new Personagem(nomeJogador);
        const jogador2 = new Personagem(nomeOponente);

        this.imprimirEstado(jogador1, jogador2);

        let gameOver = false;
        let rodada = 1;

        while (!gameOver) {
            console.log(`\n== Rodada ${rodada} ==`);
            const comandoJogador1 = this.obterComandoJogador(jogador1);
            const comandoJogador2 = jogador2.gerarComandoValido();

            console.log(`${jogador1.nome} escolheu: ${comandoJogador1}`);
            console.log(`${jogador2.nome} escolheu: ${comandoJogador2}`);

            this.processarComandos(jogador1, jogador2, comandoJogador1, comandoJogador2);
            this.processarComandos(jogador2, jogador1, comandoJogador2, comandoJogador1);

            this.imprimirEstado(jogador1, jogador2);

            if (jogador1.vida <= 0 || jogador2.vida <= 0) {
                gameOver = true;
            }

            rodada++;
        }

        this.declararVencedor(jogador1, jogador2);
    }

    iniciarEmLote(nomeJogador, nomeOponente) {
        const jogador1 = new Personagem(nomeJogador);
        const jogador2 = new Personagem(nomeOponente);

        this.imprimirEstado(jogador1, jogador2);

        let gameOver = false;
        let rodada = 1;

        const comandosJogador1 = this.obterComandosEmLote();

        for (let comando of comandosJogador1) {
            if (gameOver) break;

            console.log(`\n== Rodada ${rodada} ==`);
            console.log(`${jogador1.nome} escolheu: ${comando}`);

            const comandoJogador2 = jogador2.gerarComandoValido();
            console.log(`${jogador2.nome} escolheu: ${comandoJogador2}`);

            if (!jogador1.checarStaminaSuficiente(comando)) {
                console.log(`Stamina insuficiente para executar '${comando}'. ${jogador1.nome}, o comando será revertido para recuperar stamina.`);
                comando = CONFIG.RECARREGAR_COMANDO;
            }

            this.processarComandos(jogador1, jogador2, comando, comandoJogador2);
            this.processarComandos(jogador2, jogador1, comandoJogador2, comando);

            this.imprimirEstado(jogador1, jogador2);

            if (jogador1.vida <= 0 || jogador2.vida <= 0) {
                gameOver = true;
            }

            rodada++;
        }

        this.declararVencedor(jogador1, jogador2);
    }

    obterComandoJogador(jogador) {
        let comandoValido = false;
        let comando = '';

        while (!comandoValido) {
            comando = prompt(`Escolha sua ação (${CONFIG.ATACAR_COMANDO}: Atacar, ${CONFIG.BLOQUEAR_COMANDO}: Bloquear, ${CONFIG.RECARREGAR_COMANDO}: Recarregar Stamina, ${CONFIG.ESPECIAL_COMANDO}: Ataque Especial): `).toUpperCase();
            if (![CONFIG.ATACAR_COMANDO, CONFIG.BLOQUEAR_COMANDO, CONFIG.RECARREGAR_COMANDO, CONFIG.ESPECIAL_COMANDO].includes(comando)) {
                console.log('Comando inválido. Tente novamente.');
                continue;
            }
            if (!jogador.checarStaminaSuficiente(comando)) {
                console.log('Stamina insuficiente para este comando. Tente novamente.');
                continue;
            }
            comandoValido = true;
        }

        return comando;
    }

    obterComandosEmLote() {
        let comandosValido = false;
        let comandos = [];

        while (!comandosValido) {
            const entrada = prompt(`Insira ${CONFIG.TOTAL_COMANDOS_LOTE} comandos (${CONFIG.ATACAR_COMANDO}, ${CONFIG.BLOQUEAR_COMANDO}, ${CONFIG.RECARREGAR_COMANDO}, ${CONFIG.ESPECIAL_COMANDO}) sem espaços: `).toUpperCase();
            if (entrada.length != CONFIG.TOTAL_COMANDOS_LOTE) {
                console.log(`Você deve inserir exatamente ${CONFIG.TOTAL_COMANDOS_LOTE} comandos.`);
                continue;
            }
            if (!validarComandos(entrada, [CONFIG.ATACAR_COMANDO, CONFIG.BLOQUEAR_COMANDO, CONFIG.RECARREGAR_COMANDO, CONFIG.ESPECIAL_COMANDO])) {
                console.log(`Comandos inválidos encontrados. Use apenas ${CONFIG.ATACAR_COMANDO}, ${CONFIG.BLOQUEAR_COMANDO}, ${RECARREGAR_COMANDO}, ${CONFIG.ESPECIAL_COMANDO}.`);
                continue;
            }
            comandos = entrada.split('');
            comandosValido = true;
        }

        return comandos;
    }

    processarComandos(atacante, defensor, comandoAtacante, comandoDefensor) {
        
        atacante.estadoAtual = atacante.automato.getProximoEstado(atacante.estadoAtual, comandoAtacante);

        switch (comandoAtacante) {
            case CONFIG.ATACAR_COMANDO:
                atacante.stamina -= CONFIG.CUSTO_ATACAR;
                if (comandoDefensor != CONFIG.BLOQUEAR_COMANDO) {
                    defensor.aplicarDano(CONFIG.DANO_ATACAR);
                    defensor.estadoAtual = estados.ATINGIDO;
                    console.log(`${atacante.nome} atacou ${defensor.nome}, causando ${CONFIG.DANO_ATACAR} de dano!`);
                } else {
                    console.log(`${defensor.nome} bloqueou o ataque de ${atacante.nome}!`);
                }
                break;

            case CONFIG.ESPECIAL_COMANDO:
                atacante.stamina -= CONFIG.CUSTO_ESPECIAL;
                const danoEspecial = (comandoDefensor == CONFIG.BLOQUEAR_COMANDO) ? CONFIG.DANO_ESPECIAL_BLOQUEADO : CONFIG.DANO_ESPECIAL_NAO_BLOQUEADO;
                defensor.aplicarDano(danoEspecial);
                defensor.estadoAtual = estados.ATINGIDO;
                console.log(`${atacante.nome} realizou um ataque especial em ${defensor.nome}, causando ${danoEspecial} de dano!`);
                break;

            case CONFIG.RECARREGAR_COMANDO:
                atacante.recuperarStamina();
                atacante.estadoAtual = estados.RECARREGANDO_STAMINA;
                console.log(`${atacante.nome} está recarregando stamina.`);
                break;

            case CONFIG.BLOQUEAR_COMANDO:
                atacante.stamina -= CONFIG.CUSTO_BLOQUEAR;
                atacante.estadoAtual = estados.BLOQUEANDO;
                console.log(`${atacante.nome} está bloqueando.`);
                break;

            default:
                console.log(`Comando '${comandoAtacante}' não reconhecido. ${atacante.nome} irá recaregar a energia.`);
                atacante.estadoAtual = estados.RECARREGANDO_STAMINA;
                break;
        }

        if (atacante.stamina <= 0) {
            atacante.stamina = 0;
            atacante.estadoAtual = estados.SEM_STAMINA;
            console.log(`${atacante.nome} está sem stamina!`);
        }

        console.log(`Estado de ${atacante.nome}: ${atacante.estadoAtual}`);
        console.log(`Estado de ${defensor.nome}: ${defensor.estadoAtual}`);
    }

    imprimirEstado(jogador1, jogador2) {
        console.log('\n--- Estado Atual ---');
        jogador1.imprimirInformacoes();
        jogador2.imprimirInformacoes();
        console.log('--------------------\n');
    }

    declararVencedor(jogador1, jogador2) {
        console.log('\n== Resultado Final ==');
        if (jogador1.vida > jogador2.vida) {
            jogador1.estadoAtual = estados.VENCEU;
            jogador2.estadoAtual = estados.DERROTADO;
            console.log(`Parabéns, ${jogador1.nome} venceu!`);
        } else if (jogador2.vida > jogador1.vida) {
            jogador1.estadoAtual = estados.DERROTADO;
            jogador2.estadoAtual = estados.VENCEU;
            console.log(`Você perdeu para ${jogador2.nome}.`);
        } else {
            jogador1.estadoAtual = estados.EMPATADO;
            jogador2.estadoAtual = estados.EMPATADO;
            console.log('Empate!');
        }

        console.log('\n--- Estado Final ---');
        jogador1.imprimirInformacoes();
        jogador2.imprimirInformacoes();
        console.log('--------------------\n');

        console.log('Fim de Jogo.');
    }
}

module.exports = Jogo;
const estados = {
    q0: 'parado',
    q1: 'bloqueando',
    q2: 'atacando',
    q3: 'ataque especial',
    q4: 'atingido',
    q5: 'sem stamina',
    q6: 'recarregando stamina',
    q7: 'venceu',
    q8: 'derrotado'
};

const transicoes = {
    "parado": { "A": estados.q2, "B": estados.q1, "E": estados.q3 },
    "bloqueando": { "A": estados.q2, "B": estados.q1, "R": estados.q6, "E": estados.q3 },
    "atacando": { "A": estados.q2, "B": estados.q1, "R": estados.q6 },
    "ataque especial": {},
    "atingido": { "A": estados.q2, "B": estados.q1, "R": estados.q6, "E": estados.q3 },
    "sem stamina": { "B": estados.q1, "R": estados.q6 },
    "recarregando stamina": { "A": estados.q2, "B": estados.q1, "R": estados.q6, "E": estados.q3 },
    "venceu": {},
    "derrotado": {}
}

/*
 Se o comando do jogador1 for para atacar e o comando do jogador2 não for de bloquear, então o jogador2 passa para
 estado 'atingido' e perde 15 de vida. Se o jogador2 estiver bloqueando, então ele não toma dano. De qualquer forma,
 o jogador que atacou perde 15 de stamina.

 O ataque especial consome 100 de stamina do jogador. Se o adversário estiver bloqueando, o ataque causa 20 de dano,
 caso contrário causa 35.

 Recarregar stamina recupera 25 de stamina para o jogador, mas o deixa vulnerável a ataques.

 O comando de bloquear não tem custo de stamina para os jogadores.
*/

const transicao = (jogador1, jogador2, comandoJogador1, comandoJogador2) => {
    jogador1.estadoAtual = transicoes[jogador1.estadoAtual][comandoJogador1];
    
    console.log(jogador1.estadoAtual);

    if (jogador1.estadoAtual == 'atacando') {
        jogador1.stamina -= 15;        
        if (comandoJogador2 != 'B') {
            jogador2.estadoAtual = 'atingido';
            jogador2.vida -= 15;
        }
    }

    if (jogador1.estadoAtual == 'recarregando stamina') {
        jogador1.stamina += 25;
        jogador1.stamina = jogador1.stamina > 100 ? 100 : jogador1.stamina;
    }

    if (jogador1.estadoAtual == 'ataque especial') {
        jogador2.vida -= comandoJogador2 == 'B' ? 20 : 30;
        jogador1.stamina = 0;
    }

    if (jogador1.stamina == 0) jogador1.estadoAtual = 'sem stamina';
    if (jogador2.vida <= 0) jogador2.estadoAtual = 'derrotado';
}

const automato = { Q: estados, alfabeto: ['R', 'B', 'E', 'A'], transicao, q0: estados.q0, F: [estados.q4]};
// R: recarregar stamina
// B: bloquear ataques
// E: ataque especial
// A: ataque normal

module.exports = automato;
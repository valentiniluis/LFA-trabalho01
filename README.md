# Mortal Kombat LFA

**Mortal Kombat LFA** é um jogo de luta baseado em autômatos finitos! Foi desenvolvido para a matéria de Linguagens Formais e Automatos do curso de ciência da computação da UFFS.

## Desenvolvedores do projeto:

| Nome                               | Matriculo   | GitHub                                 
|------------------------------------|-------------| ----------------------------------------- 
| João Vítor Klein John              | 2221101018  | [GitHub](https://github.com/joaovjohn)
| Luis Fernando Cerrutti Valentini   | 20230001310 | [GitHub](https://github.com/valentiniluis)    

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Jogar](#como-jogar)
  - [Configuração](#configuração)
  - [Modo 1: Rodada por Rodada](#modo-1-rodada-por-rodada)
  - [Modo 2: Inserir 10 Comandos de Uma Vez](#modo-2-inserir-10-comandos-de-uma-vez)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Regras do Jogo](#regras-do-jogo)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (Versão 12 ou superior)
- [npm](https://www.npmjs.com/) (Gerenciador de pacotes do Node.js)

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/valentiniluis/LFA-trabalho01.git jogo-mk
    ```

2. **Acesse o Diretório do Projeto:**
    ```bash
    cd jogo-mk
    ```
3.	**Instale as Dependências:**

    O jogo utiliza o pacote prompt-sync para interação com o usuário via console.
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Como Jogar

Para iniciar o jogo, execute o seguinte comando no terminal:

    node app.js


#### Configuração

Você pode configurar o jogo da forma que quiser em **src/config.js**

    - máximo de vida
    - máximo de stamina
    - teclas para os comandos
    - custo de stamina 
    - dano causado
    - total de comandos para jogar no modo 2

#### Modo 1: Rodada por Rodada

Neste modo, você escolherá suas ações uma a uma em cada rodada.

Passos:

1. Inserir Nomes:
    - Você será solicitado a inserir o nome do seu lutador.
    - Em seguida, insira o nome do seu oponente.
2. Escolher Modo de Jogo:
    - Selecione o modo Rodada por Rodada digitando 1.
3. Jogar:
    - Em cada rodada, escolha uma das ações disponíveis (A, B, R, E).
    - O oponente escolherá sua ação automaticamente.
    - O estado dos lutadores será atualizado e exibido após cada rodada.

#### Modo 2: Inserir 10 Comandos de Uma Vez

Neste modo, você poderá inserir uma sequência de 10 comandos de uma vez e ver o resultado final do jogo.

Passos:

1.	Inserir Nomes:
    - Insira o nome do seu lutador.
	- Insira o nome do seu oponente.
2.	Escolher Modo de Jogo:
	- Selecione o modo Inserir 10 Comandos de Uma Vez digitando 2.
3.	Inserir Comandos:
	- Insira uma sequência de 10 comandos sem espaços, utilizando apenas A, B, R, E.
	- Por exemplo: AARBEBRREA
4.	Ver Resultado:
	- O jogo processará todos os comandos e exibirá o resultado final, declarando o vencedor.

#### Comandos Disponíveis

**A : Atacar**

    - Executa um ataque normal.
    - Custo: 15 de stamina.
    - Dano: 15 de vida para o oponente se não bloquear.

**B : Bloquear**

	- Bloqueia ataques do oponente.
	- Custo: 10 de stamina.

**R : Recarregar Stamina**

	- Recupera 25 de stamina.
	- Custo: Nenhum.
	- Efeito: Deixa o jogador vulnerável a ataques durante a recarga.

**E : Ataque Especial**

	- Executa um ataque especial.
	- Custo: 100 de stamina.
	- Dano: 20 de vida para o oponente se bloquear, 35 se não bloquear.

#### Regras do Jogo

1.	Ataques e Bloqueios:
	- Se você atacar (A) e o oponente não bloquear (B), o oponente perde 15 de vida.
	- Se o oponente bloquear, ele não recebe dano do ataque normal.
    - Consome 15 de stamina.
2.	Ataque Especial:
	- Consome 100 de stamina.
	- Causa 20 de dano se o oponente bloquear.
	- Causa 35 de dano se o oponente não bloquear.
3.	Recarregar Stamina:
	- Recupera 25 de stamina, até um máximo de 100.
	- Durante a recarga, o jogador está vulnerável a ataques.
4.	Bloquear:
	- Consome 10 de stamina.
	- Permite bloquear ataques do oponente.
5.	Fim de Jogo:
	- O jogo termina quando a vida de um dos jogadores chega a 0 ou após 10 rodadas no modo de comandos em lote.
	- O jogador com mais vida restante é declarado vencedor. Em caso de empate, o jogo termina empatado.

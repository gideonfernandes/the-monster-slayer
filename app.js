new Vue({
  el: '#app',
  data: {
    playing: false,
    playerHP: 100,
    monsterHP: 100,
    gameLog: [],
    winner: '',
  },
  methods: {
    attack() {
      const monsterAttack = Math.round((Math.random() * 10)) + 10;
      const playerAttack = Math.round((Math.random() * 10)) + 8;

      this.attackAction(monsterAttack, playerAttack);
    },
    specialAttack() {
      const monsterAttack = Math.round((Math.random() * 10)) + 8;
      const playerAttack = Math.round((Math.random() * 10)) + 10;

      this.attackAction(monsterAttack, playerAttack);
    },
    attackAction(monsterAttack, playerAttack) {
      this.playerHP = this.playerHP - monsterAttack;
      this.monsterHP = this.monsterHP - playerAttack;

      const currentPlayerLog = `JOGADOR ATINGIU O MONSTRO COM ${playerAttack} PONTOS!`;
      const currentMonsterLog = `MONSTRO ATINGIU O JOGADOR COM ${monsterAttack} PONTOS!`;

      this.gameLog.push(currentPlayerLog);
      this.gameLog.push(currentMonsterLog);

      this.verifyGame();
    },
    heal() {
      const monsterAttack = Math.round((Math.random() * 10)) + 10;
      const playerHeal = Math.round((Math.random() * 10)) + 10;

      this.playerHP = this.playerHP - monsterAttack;
      this.playerHP = this.playerHP + playerHeal;

      if (this.playerHP > 100) this.playerHP = 100;

      const currentPlayerLog = `JOGADOR CUROU-SE COM ${playerHeal} PONTOS!`;
      const currentMonsterLog = `MONSTRO ATINGIU O JOGADOR COM ${monsterAttack} PONTOS!`;

      this.gameLog.push(currentPlayerLog);
      this.gameLog.push(currentMonsterLog);

      this.verifyGame();
    },
    newGame(playing = false) {
      this.playing = playing;
      this.playerHP = 100;
      this.monsterHP = 100;
      this.gameLog = [];
      this.winner = '';
    },
    verifyGame() {
      if (this.playerHP <= 0 && this.monsterHP <= 0) {
        this.gameOver('nothing');
        return;
      };

      if (this.monsterHP <= 0) {
        this.gameOver('win');
        return;
      };
      
      if (this.playerHP <= 0) {
        this.gameOver('lose');
        return;
      };
    },
    gameOver(status) {
      this.playing = false;

      if (status === 'nothing') {
        this.playerHP = 0;
        this.monsterHP = 0;
        this.winner = 'nothing';
        return;
      };

      if (status === 'win') {
        this.monsterHP = 0;
        this.winner = 'player';
        return;
      };

      if (status === 'lose') {
        this.playerHP = 0;
        this.winner = 'monster';
        return;
      };
    },
  },
});

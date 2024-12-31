class EndScene extends Phaser.Scene {
    constructor() {
      super({ key: 'EndScene' });
    }
    create() {
      // Creates the text on the start screen:
      let notiLine = gameState.isWon ? 'Congratulations! You won!' : 'Game Over! You lost!';

      this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, `${notiLine}` , { fill: '#000000', fontSize: '45px' }).setOrigin(0.5, 0.5);
      this.add.text(this.cameras.main.width / 2, 300, `Answer is ${gameState.word}`, { fill: '#000000', fontSize: '40px' }).setOrigin(0.5, 0.5);
      // Create continue button
      this.newGameButton = this.add.rectangle(config.width / 2, config.height / 2 + 50, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
      this.newGameButtonText = this.add.text(config.width / 2, config.height / 2 + 50, 'New Game', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

      this.newGameButton.on('pointerover', () => {
          this.tweens.add({
              targets: [this.newGameButton, this.newGameButtonText],
              y: '-=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.newGameButton.on('pointerout', () => {
          this.tweens.add({
              targets: [this.newGameButton, this.newGameButtonText],
              y: '+=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.newGameButton.on('pointerup', () => {
          this.scene.stop('EndScene'); // Stop the current scene
          this.scene.start('GameScene'); // Change 'HomeScene' to the actual scene name
      });

      // Create home button
      this.homeButton = this.add.rectangle(config.width / 2, config.height / 2 + 100, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
      this.homeButtonText = this.add.text(config.width / 2, config.height / 2 + 100, 'Home', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

      this.homeButton.on('pointerover', () => {
          this.tweens.add({
              targets: [this.homeButton, this.homeButtonText],
              y: '-=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.homeButton.on('pointerout', () => {
          this.tweens.add({
              targets: [this.homeButton, this.homeButtonText],
              y: '+=2',
              duration: 100,
              ease: 'Power2',
          });
      });

      this.homeButton.on('pointerup', () => {
          this.scene.stop('EndScene'); // Stop the current scene
          gameState.playerScore=0;
          gameState.computerScore= 0;
          this.scene.start('StartScene'); // Change 'HomeScene' to the actual scene name
      });
  
  
    }
  }
  
  
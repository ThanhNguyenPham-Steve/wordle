class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }
    create() {
      // Creates the text on the start screen:
      this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, "WORDLE" , { fill: '#000000', fontSize: '45px' }).setOrigin(0.5, 0.5);
      this.add.text(this.cameras.main.width / 2, 520, 'Ready To Play?\nClick to start!', { fill: '#000000', fontSize: '40px' }).setOrigin(0.5, 0.5);
                          
      this.input.on('pointerup', () => {
        // Add logic to transition from StartScene to GameScene:
              this.scene.stop('StartScene')
              this.scene.start('GameScene')
      });
  
  
    }
  }
  
  
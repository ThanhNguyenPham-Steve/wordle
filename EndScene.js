class EndScene extends Phaser.Scene {
    constructor() {
      super({ key: 'EndScene' });
    }
    create() {
      // Creates the text on the start screen:
      this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, "EndSceneee" , { fill: '#000000', fontSize: '45px' }).setOrigin(0.5, 0.5);
                          
      this.input.on('pointerup', () => {
        // Add logic to transition from EndScene to GameScene:
              this.scene.stop('EndScene')
              this.scene.start('StartScene')
      });
  
  
    }
  }
  
  
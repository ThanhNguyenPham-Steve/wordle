class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    create() {
        // Creates the game instructions
        this.add.rectangle(700, 50, 30, 30, 0x000000).setOrigin(0.5, 0.5);
        this.add.rectangle(700, 90, 30, 30, 0x00CC66).setOrigin(0.5, 0.5);
        this.add.rectangle(700, 130, 30, 30, 0xCCCC00).setOrigin(0.5, 0.5);
        this.add.rectangle(700, 170, 30, 30, 0x606060).setOrigin(0.5, 0.5);
        

        this.add.text(730, 90, 'Correct letter in the correct position', { fill: '#000000', fontSize: '20px' });
        this.add.text(730, 130, 'Correct letter in the wrong position', { fill: '#000000', fontSize: '20px' });
        this.add.text(730, 170, 'Wrong letter', { fill: '#000000', fontSize: '20px' });
        this.add.text(730, 50, 'Not used letter', { fill: '#000000', fontSize: '20px' });


        // Create a group to store all the characters
        gameState.chars = this.add.group();
        // Create 26 objects for each character A-Z and add them to gameState.chars
        const startX = 50;
        const startY = 100;
        const offsetX = 50;
        const offsetY = 50;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        characters.split('').forEach((char, index) => {
            const x = startX + (index % 13) * offsetX;
            const y = startY + Math.floor(index / 13) * offsetY;
            const charObject = this.add.text(x, y, char, { fill: '#FFFFFF', fontSize: '40px',backgroundColor:'#000000' }).setOrigin(0.5, 0.5);
            charObject.state = 'not-selected';
            gameState.chars.add(charObject);
        });




        let currentIndex = 0;

        // Create a group to store all the word slots
        gameState.slots = this.add.group();
        // Create 5 word slots and add them to gameState.slots
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 5; i++) {
                const slot = this.add.rectangle(300 + i * 70, 220+j*70, 40, 40, 0x000000);
                slot.index = i;
                gameState.slots.add(slot);
            }
    }


        // Create continue button
        this.newGame = this.add.rectangle(80, 30, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        this.newGameText = this.add.text(80, 30, 'New Game', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

        this.newGame.on('pointerover', () => {
            this.tweens.add({
                targets: [this.newGame, this.newGameText],
                y: '-=2',
                duration: 100,
                ease: 'Power2',
            });
        });

        this.newGame.on('pointerout', () => {
            this.tweens.add({
                targets: [this.newGame, this.newGameText],
                y: '+=2',
                duration: 100,
                ease: 'Power2',
            });
        });

        this.newGame.on('pointerup', () => {
            this.scene.stop('GameScene');
            this.scene.start('GameScene');
        });

        // Create home button
        this.homeButton = this.add.rectangle(250, 30, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        this.homeButtonText = this.add.text(250, 30, 'Home', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

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
            this.scene.stop('GameScene'); // Stop the current scene
            this.scene.start('StartScene'); // Change 'HomeScene' to the actual scene name
        });

        


    }
}


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
            const charObject = this.add.text(x, y, char, { fill: '#FFFFFF', fontSize: '40px', backgroundColor: '#000000' }).setOrigin(0.5, 0.5);
            charObject.state = 'not-selected';
            gameState.chars.add(charObject);
        });




        this.currentIndex = 0;
        gameState.word = gameState.words[Math.floor(Math.random() * gameState.words.length)];
        this.wordArray = gameState.word.split('');

        // Create a group to store all the word slots
        gameState.slots = this.add.group();
        // Create 5 word slots and add them to gameState.slots
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 5; i++) {
                const slot = this.add.rectangle(300 + i * 70, 220 + j * 70, 40, 40, 0x000000).setOrigin(0.5, 0.5);
                slot.index = j * 6 + i;
                gameState.slots.add(slot);

                // Create a text object for each slot
                const slotText = this.add.text(300 + i * 70, 220 + j * 70, '', { fill: '#FFFFFF', fontSize: '40px' }).setOrigin(0.5, 0.5);
                slot.textObject = slotText;
            }
        }
        this.typedLetters = [];
        // Event listener for keyboard input
        this.input.keyboard.on('keydown', (event) => {
            const key = event.key.toUpperCase();
            if (key === 'BACKSPACE' && this.typedLetters.length > 0) {
                this.currentIndex--;
                let slot = gameState.slots.getChildren()[this.currentIndex];
                slot.textObject.setText('');
                this.typedLetters.pop();
            }
         else if (key === 'ENTER') {
            this.submit.emit('pointerup');
        }
            else if (this.typedLetters.length < 5) {
                if (characters.includes(key)) {
                    this.typedLetters.push(key);
                    let slot = gameState.slots.getChildren()[this.currentIndex];
                    slot.textObject.setText(key);
                    this.currentIndex++;
                }
            }
        });

        // Create submit button
        this.submit = this.add.rectangle(700, 220, 150, 40, 0xF2EAEA).setInteractive({ cursor: 'pointer' });
        this.submitText = this.add.text(700, 220, 'Submit', { fill: '#000000', fontSize: '20px' }).setOrigin(0.5, 0.5);

        this.submit.on('pointerover', () => {
            this.tweens.add({
                targets: [this.submit, this.submitText],
                y: '-=2',
                duration: 100,
                ease: 'Power2',
            });
        });

        this.submit.on('pointerout', () => {
            this.tweens.add({
                targets: [this.submit, this.submitText],
                y: '+=2',
                duration: 100,
                ease: 'Power2',
            });
        });
        // Create warning text
        this.warningText = this.add.text(120, 300, '', { fill: '#FF0000', fontSize: '20px', fontStyle: 'bold' }).setOrigin(0.5, 0.5);
        this.warningText.setVisible(false); // Initially hidden

        this.submit.on('pointerup', () => {
            if (this.typedLetters.length < 5) {
                this.warningText.setText('NOT ENOUGH LETTERS!');
                this.warningText.setVisible(true);
                this.time.delayedCall(2000, () => {
                    this.warningText.setVisible(false);
                });
            }
            else {
                const typedWord = this.typedLetters.join('');
                if (gameState.words.includes(typedWord)) {
                    this.warningText.setVisible(false);
                    // Proceed with the game logic for a valid word
                    let count = 0;
                    for (let i = 4; i >= 0; i--) {
                        if (this.wordArray[i] === this.typedLetters[i]) {
                            count++;
                            gameState.slots.getChildren()[this.currentIndex - 5 + i].textObject.setStyle({ backgroundColor: '#00CC66' });
                            const charIndex = this.typedLetters[i].charCodeAt(0) - 65;
                            if (gameState.chars.getChildren()[charIndex].state === 'not-selected' || gameState.chars.getChildren()[charIndex].state === 'correct') {
                                gameState.chars.getChildren()[charIndex].state = 'exaclty-correct';
                                gameState.chars.getChildren()[charIndex].setStyle({ backgroundColor: '#00CC66' });
                            }

                        }
                        else if (this.wordArray.includes(this.typedLetters[i])) {
                            gameState.slots.getChildren()[this.currentIndex - 5 + i].textObject.setStyle({ backgroundColor: '#CCCC00' });
                            const charIndex = this.typedLetters[i].charCodeAt(0) - 65;
                            if (gameState.chars.getChildren()[charIndex].state === 'not-selected') {
                                gameState.chars.getChildren()[charIndex].state = 'correct';
                                gameState.chars.getChildren()[charIndex].setStyle({ backgroundColor: '#CCCC00' });
                            }
                        }
                        else {
                            gameState.slots.getChildren()[this.currentIndex - 5 + i].textObject.setStyle({ backgroundColor: '#606060' });
                            const charIndex = this.typedLetters[i].charCodeAt(0) - 65;
                            if (gameState.chars.getChildren()[charIndex].state === 'not-selected') {
                                gameState.chars.getChildren()[charIndex].setStyle({ backgroundColor: '#606060' });
                            }
                        }
                    }
                    if (count === 5) {
                        gameState.isWon = true;
                        this.warningText.setText('CORRECT WORD!');
                        this.warningText.setStyle({ fill: '#00CC66' });
                        this.warningText.setVisible(true);
                        this.time.delayedCall(2000, () => {
                            this.warningText.setVisible(false);
                            this.scene.stop('GameScene');
                            this.scene.start('EndScene');
                        });
                    }
                    if (this.currentIndex === 30) {
                        gameState.isWon = false;
                        this.scene.stop('GameScene');
                        this.scene.start('EndScene');
                    }
                    this.typedLetters = [];
                } else {
                    this.warningText.setText('WORD NOT IN LIST!');
                    this.warningText.setVisible(true);
                    this.time.delayedCall(2000, () => {
                        this.warningText.setVisible(false);
                    });
                }
            }
        });
        // Create newGame button
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


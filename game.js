const gameState = {
    isWon: false,
    words: []
};
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    backgroundColor: '#FFFFDE',
    scene: [StartScene, GameScene, EndScene]
  };
  // Fetch words from the text file and initialize the game
fetch('path/to/words.txt')
.then(response => response.text())
.then(data => {
    gameState.words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    // Initialize the Phaser game after fetching the words
    const game = new Phaser.Game(config);
})
.catch(error => {
    console.error('Error fetching words:', error);
});

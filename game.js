class PrefixNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}
class PrefixTree {
    constructor(){
        this.root = new PrefixNode();
    }
    insert(word){
        let node = this.root;
        for (let i =0;i<5;i++){
            let char = word[i];
            if (!node.children[char]){
                node.children[char] = new PrefixNode();
            }
            node = node.children[char];
        }
        node.isWord = true;
    }
    search(word){
        let node = this.root;
        for (let i =0;i<5;i++){
            let char = word[i];
            if (!node.children[char]){
                return false;
            }
            node = node.children[char];
        }
        return node.isWord;
    }
}

const gameState = {
    isWon: false,
    wordsList: []
};
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 675,
    backgroundColor: '#FFFFDE',
    scene: [StartScene, GameScene, EndScene]
  };
  // Fetch words from the text file and initialize the game
fetch('words.txt')
.then(response => response.text())
.then(data => {
    gameState.wordsList = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    gameState.words = new PrefixTree();
    gameState.wordsList.forEach(word => gameState.words.insert(word));
    // Initialize the Phaser game after fetching the words
    const game = new Phaser.Game(config);
})
.catch(error => {
    console.error('Error fetching words:', error);
});
const SHA256 = require('crypto-js/sha256');

class Blockchain {
    constructor() {
      this.blocks = [];
    }

    addBlock(block) {
      if (this.blocks.length == 0) {
        // push initial block
        this.blocks.push(block);
        console.log("Initial Block: " + Object.values(this.blocks[0]));
      }

      else {
        // validate previous block
        let previousBlock = this.blocks[this.blocks.length - 1];
        block.previousHash = SHA256(previousBlock);

        this.blocks.push(block);
      }      
    }

    blockHeight() {
      return this.blocks.length;
    }
    
    isValid() {
      for (let i = 1; i < this.blocks.length; i++) {
        const block = this.blocks[i];
        const previousBlock = this.blocks[i - 1];

        let previousBlockHash = SHA256(previousBlock).toString();

        if (block.previousHash.toString() !== previousBlockHash) {
          return false;
        }
      }

      return true;
    }
  }
  
  module.exports = Blockchain;
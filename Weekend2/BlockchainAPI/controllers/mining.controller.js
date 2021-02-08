const Block = require('../models/Block');
const db = require('../db');
const miningRoutes = require('../app/routes/mining.routes');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));

let mining;
let publickey;

// PUT start or stop mining
exports.mining = function (req, res) {
let request = req.body;

    if (request.startmining === true) {
        mining = true;
        res.status(200).send("Mining started");
        mine(); 
    }

    else if (request.startmining === false) {
        mining = false;
        res.status(200).send("Mining stopped");
    }

    else {
        console.log("Invalid parameter type! Use true or false");
        res.status(403).send("Forbidden");
    }
}

function mine() {    
    if(!mining) {
        console.log("Mining is stopped or not started");
    }

    else {
        const block = new Block();

        while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
            block.nonce++;
          }
        
        block.execute();
    
        db.blockchain.addBlock(block);
    
        console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);
    
        setTimeout(mine, 2500);
    }
}
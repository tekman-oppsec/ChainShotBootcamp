// TODO: Bring this into project to autogenerate keys from FE or BE API

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const key = ec.genKeyPair();

class Miner {
    constructor(id, publickey, privatekey) {
        this.id = id;
        this.publickey = publickey;
        this.privatekey = privatekey;
    }

    generateKeys() {
        this.publickey = key.getPublic().encode('hex');
        this.privatekey = key.getPrivate().toString(16);
    }
}

module.exports = Miner;
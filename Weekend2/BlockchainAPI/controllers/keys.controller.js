const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();

// POST (create) public and private keys
exports.create = function(req, res) {
    let publickey = key.getPublic().encode('hex');
    let privatekey = key.getPrivate().toString(16);

    console.log("######## Keys ########\n" + "Public Key: " + publickey + "\n" + "Private Key: " + privatekey);
    res.end("Public Key: " + publickey + "\nPrivate Key: " + privatekey);
}
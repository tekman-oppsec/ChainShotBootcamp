const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

// Generate account public and private keys
const balances = {};
const privateKeys = {};
let accountNum = 5;

for (let i = 0; i < accountNum; i++) {
  const key = ec.genKeyPair();
  const privateKey = key.getPrivate().toString(16);
  const publicKey = key.getPublic().encode('hex');

  balances[publicKey] = Math.floor(Math.random() * 100);
  privateKeys[publicKey] = privateKey;
}

/*const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}*/

// Print available accounts
const strAccounts = "\nAvailable Accounts\n=====================";
console.log(strAccounts);
const accounts = Object.keys(balances);
//console.log(balances["1"]);

for (let i = 0; i < accounts.length; i++) {
  let linePrint = "(" + i + ") ";
  linePrint += accounts[i];
  linePrint += " (" + balances[accounts[i]] + " ETH)";

  console.log(linePrint);
}

// Print private keys
const strPrivateKeys = "\nPrivate Keys\n=====================";
console.log(strPrivateKeys);
const keys = Object.keys(privateKeys);

for (let i = 0; i < accounts.length; i++) {
  let linePrint = "(" + i + ") ";
  linePrint += privateKeys[keys[i]];

  console.log(linePrint);
}

console.log("\n");

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, privateKey} = req.body;

  // Validate inputs
  if (privateKey === "") {
    res.send({ balance: "Private Key cannot be empty!"});
    return;
  }
  else {
    // Validate recipient
    validateRecipient(recipient);

    function validateRecipient(r) {
      for (let i = 0; i < accounts.length; i++) {
        if (r === accounts[i]) {
          console.log('Valid recipient found');
          return;
        }
      }
        res.send({ balance: "Invalid Recipient!"});
        console.log("Invalid recipient submitted");
        return;
    }

    // Validate private key
    validateKey(privateKey);

    function validateKey(pkey) {
      if (pkey === privateKeys[sender]) {
        console.log('Valid private key found');
        console.log(privateKeys[sender]);

        // Transfer funds
        balances[sender] -= amount;
        balances[recipient] = (balances[recipient] || 0) + +amount;
        console.log(balances[recipient]);
        res.send({ balance: balances[sender] });
      }
      else {
        res.send({ balance: "Invalid Private Key!"});
        console.log("Invalid Private Key submitted");
        return;
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
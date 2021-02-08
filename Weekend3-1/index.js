// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const cors = require('cors');
const axios = require('axios');
const ethers = require('ethers');
const bodyParser = require('body-parser');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    // Default load to Mainnet network
    if (req.query.blockNetwork == null) {
         // Setup call to get latest ETH price
        const etherScanKey = "RAFATKTQZT9SYC46TG3FBV83JVZCBSJF69";
        const priceURL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + etherScanKey;
        let currentPrice = 0;

        // Call the main page
        function callIndex(ethPrice) {
            currentPrice = ethPrice;            

            // Get latest block from Mainnet
            const network = "https://mainnet.infura.io/v3/33087afce72c4533af64bfb6cf95719f";
            const secret = "54a04e3d10ad4cf7be442f987bb36583";
            axios.post(network, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_blockNumber",
                params: []
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                const blockNumber = parseInt(response.data.result);
                let blocks = [];
                
                for (let i = 0; i < 10; i++) {
                    blocks.push(blockNumber - i);
                }

                res.render("index", { title: "Home", etherPrice: "Current ETH Price $" + currentPrice + " USD", blocks: blocks, currentNetwork: 'Mainnet' });
            });
        }

        axios.get(priceURL)
            .then(response => {
                callIndex(response.data.result.ethusd);            
        }).catch(error => {
            res.render("index", { title: "Home", etherPrice: "Error Retrieving" });
        });
    }

    // Change Network
    else {
        // Setup call to get latest ETH price
        const etherScanKey = "RAFATKTQZT9SYC46TG3FBV83JVZCBSJF69";
        const priceURL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + etherScanKey;
        let currentPrice = 0;

        // Call the main page
        function callIndex(ethPrice) {
            currentPrice = ethPrice;            

            // Get latest block from selected network
            const network = req.query.blockNetwork;
            const secret = "54a04e3d10ad4cf7be442f987bb36583";
            axios.post(network, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_blockNumber",
                params: []
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                const blockNumber = parseInt(response.data.result);
                let blocks = [];
                
                for (let i = 0; i < 10; i++) {
                    blocks.push(blockNumber - i);
                }

                // Set network variable
                let newNetwork = "";
                switch(network) {
                    case "https://mainnet.infura.io/v3/33087afce72c4533af64bfb6cf95719f":
                        newNetwork = "Mainnet";
                        break;
                    case "https://ropsten.infura.io/v3/33087afce72c4533af64bfb6cf95719f":
                        newNetwork = "Ropsten";
                        break;
                    case "https://kovan.infura.io/v3/33087afce72c4533af64bfb6cf95719f":
                        newNetwork = "Kovan";
                        break;
                    case "https://rinkeby.infura.io/v3/33087afce72c4533af64bfb6cf95719f":
                        newNetwork = "Rinkeby";
                        break;
                    case "https://goerli.infura.io/v3/33087afce72c4533af64bfb6cf95719f":
                        newNetwork = "Goerli"
                        break;
                }

                res.render("index", { title: "Home", etherPrice: "Current ETH Price $" + currentPrice + " USD", blocks: blocks, currentNetwork: newNetwork });
            });
        }

        axios.get(priceURL)
            .then(response => {
                callIndex(response.data.result.ethusd);            
        }).catch(error => {
            res.render("index", { title: "Home", etherPrice: "Error Retrieving" });
        });
    }
});

app.post("/getBalance", (req, res) => {
    const wallet = req.body.walletAddress;
    const network = req.body.networkSelect;
    const secret = req.body.projectSecret;

    // Set up return date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
  
    axios.post(network, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [
            wallet,
            'latest'
        ]
    }, {
        auth: {
            password: secret,
        }
    }).then((response) => {
        const ether = ethers.utils.formatUnits(response.data.result, "ether");
        res.render('getBalance', { balance: "Account Balance for address " + wallet + ": " + ether + " ETH", todayDate: today });
    }).catch(error => {
      res.send({redirect: error});
    });
});

app.post("/getBlock", (req, res) => {
    const block = req.body.params.blockNumber;
    const network = req.body.params.network;
    const secret = "54a04e3d10ad4cf7be442f987bb36583";

    switch(network) {
        case "Mainnet":
            axios.post("https://mainnet.infura.io/v3/33087afce72c4533af64bfb6cf95719f", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    "0x" + Number(block).toString(16),
                    true
                ]
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                res.send(response.data.result);
            }).catch(error => {
                console.log(error);
            });
            break;
        case "Ropsten":
            axios.post("https://ropsten.infura.io/v3/33087afce72c4533af64bfb6cf95719f", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    "0x" + Number(block).toString(16),
                    true
                ]
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                res.send(response.data.result);
            }).catch(error => {
                console.log(error);
            });
            break;
        case "Kovan":
            axios.post("https://kovan.infura.io/v3/33087afce72c4533af64bfb6cf95719f", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    "0x" + Number(block).toString(16),
                    true
                ]
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                res.send(response.data.result);
            }).catch(error => {
                console.log(error);
            });
            break;
        case "Rinkeby":
            axios.post("https://rinkeby.infura.io/v3/33087afce72c4533af64bfb6cf95719f", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    "0x" + Number(block).toString(16),
                    true
                ]
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                res.send(response.data.result);
            }).catch(error => {
                console.log(error);
            });
            break;
        case "Goerli":
            axios.post("https://goerli.infura.io/v3/33087afce72c4533af64bfb6cf95719f", {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                    "0x" + Number(block).toString(16),
                    true
                ]
            }, {
                auth: {
                    password: secret,
                }
            }).then((response) => {
                res.send(response.data.result);
            }).catch(error => {
                console.log(error);
            });
            break;
    }
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
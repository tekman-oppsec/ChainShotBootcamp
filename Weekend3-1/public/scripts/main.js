function getBlock(block) {
    // Get block information response and open popup with information
    function getBlockInfo(response) {

        bootbox.dialog({
            title: 'Block ' + block.innerHTML + " Information",
            message: '<table class="table">' +
                '<tr><td>Block Height</td><td>' + block.innerHTML + '</td>' +
                '<tr><td>Timestamp</td><td>' + Date(response.data.timestamp) + '</td>' +
                '<tr><td>Difficulty</td><td>' + parseInt(response.data.difficulty) + '</td>' +
                '<tr><td>Total Difficulty</td><td>' + parseInt(response.data.totalDifficulty) + '</td>' +
                '<tr><td>Miner</td><td>' + response.data.miner + '</td>' +
                '<tr><td>Size</td><td>' + response.data.size + '</td>' +
                '<tr><td>Gas Used</td><td>' + parseInt(response.data.gasUsed) + '</td>' +
                '<tr><td>Gas Limit</td><td>' + parseInt(response.data.gasLimit) + '</td>' +
                '<tr><td>Nonce</td><td>' + response.data.nonce + '</td>' +
                '<tr><td>Hash</td><td>' + response.data.hash + '</td>' + 
                '<tr><td>Transactions<td>' + response.data.transactions.length + ' transactions in this block' + '</td>',
            size: 'large',
            buttons: {
                cancel: {
                    label: 'Close',
                    className: 'btn-danger',
                    callback: function() {
                        console.log(block + ' information dialog closed');
                    }
                }
            }
        });
    }

    // Get the selected block's information
    let currentNetwork = document.getElementById('currentNetwork').value;

    axios.post('/getBlock', {
        params: {
            blockNumber: block.innerHTML,
            network: currentNetwork
        }
    }).then(res => {
        console.log(res);
        getBlockInfo(res);
    }).catch(error => {
        console.log(error);
    });
}

function getMiner(blockVal) {
    // Get the miner address and open window to proper network
    function getMinerInfo(response, network) {
        // Select correct network to display
        switch(network) {
            case "Mainnet":
                window.open('https://etherscan.io/address/' + response.data.miner);
                break;
            case "Ropsten":
                window.open('https://ropsten.etherscan.io/address/' + response.data.miner);
                break;
            case "Kovan":
                window.open('https://kovan.etherscan.io/address/' + response.data.miner);
                break;
            case "Rinkeby":
                window.open('https://rinkeby.etherscan.io/address/' + response.data.miner);
                break;
            case "Goerli":
                window.open('https://goerli.etherscan.io/address/' + response.data.miner);
                break;
        }
        
    }

    // Get the selected block's information
    let currentNetwork = document.getElementById('currentNetwork').value;

    axios.post('/getBlock', {
        params: {
            blockNumber: blockVal,
            network: currentNetwork
        }
    }).then(res => {
        console.log(res);
        getMinerInfo(res, currentNetwork);
    }).catch(error => {
        console.log(error);
    });
}

function getTransactions(blockValue) {
    // Get the transaction history for the block and network
    function getTransactionData(response, blockNetwork) {
        let selectMessage = "";

        for (let i = 0; i < response.data.transactions.length; i++) {
            selectMessage += "<option value=" + response.data.transactions[i].hash + ">Transaction " + i + "</option>";
        }
       
        bootbox.dialog({
            title: 'Block ' + blockValue + " Transactions",
            message: '<p>Select a Transaction to View</p>' +
                '<select class="form-select form-select-sm" id="transactionSelect">' +
                selectMessage +
                '</select>',
            size: 'medium',
            buttons: {
                cancel: {
                    label: 'Close',
                    className: 'btn-danger',
                    callback: function() {
                        console.log(blockValue + ' information dialog closed');
                    }
                },
                ok: {
                    label: 'Go to Transaction',
                    className: 'btn-primary',
                    callback: function() {
                        const transactionAddress = document.getElementById('transactionSelect').value;
                        // Select correct network to display
                        switch(blockNetwork) {
                            case "Mainnet":
                                window.open('https://etherscan.io/tx/' + transactionAddress);
                                break;
                            case "Ropsten":
                                window.open('https://ropsten.etherscan.io/tx/' + transactionAddress);
                                break;
                            case "Kovan":
                                window.open('https://kovan.etherscan.io/tx/' + transactionAddress);
                                break;
                            case "Rinkeby":
                                window.open('https://rinkeby.etherscan.io/tx/' + transactionAddress);
                                break;
                            case "Goerli":
                                window.open('https://goerli.etherscan.io/tx/' + transactionAddress);
                                break;
                        }
                    }
                }
            }
        });
    }

    // Get the selected block's information
    let currentNetwork = document.getElementById('currentNetwork').value;

    axios.post('/getBlock', {
        params: {
            blockNumber: blockValue,
            network: currentNetwork
        }
    }).then(res => {
        console.log(res);
        getTransactionData(res, currentNetwork);
    }).catch(error => {
        console.log(error);
    });
}
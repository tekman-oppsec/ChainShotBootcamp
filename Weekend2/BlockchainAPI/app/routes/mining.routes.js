module.exports = function (app) {
    const mining = require('../../controllers/mining.controller.js');

    // Create Mining API
    app.put('/api/mining', mining.mining);
}
module.exports = function (app) {
    const miners = require('../../controllers/miner.controller.js');

    // Create Miners API
    app.post('/api/miners', miners.create);
    app.get('/api/miners', miners.getAll);
    app.get('/api/miners/:id', miners.getOne);
    app.put('/api/miners/:id', miners.update);
}
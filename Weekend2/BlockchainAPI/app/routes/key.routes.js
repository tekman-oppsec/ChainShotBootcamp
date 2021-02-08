module.exports = function (app) {
    const keys = require('../../controllers/keys.controller.js');

    // Create Miners API
    app.post('/api/keys', keys.create);
}
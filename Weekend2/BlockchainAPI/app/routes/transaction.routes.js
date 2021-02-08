module.exports = function (app) {
    const transaction = require('../../controllers/transaction.controller.js');

    // Create Transaction API
    app.post('/api/transaction', transaction.create);
}
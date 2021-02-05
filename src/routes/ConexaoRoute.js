const db = require('../model/orm/models');

module.exports = function (app) {
    app.get('/conexao', (req, res) => {
        db.sequelize.authenticate().then(() => {
            res.send('conexao ok');
        })
        .catch(err => {
            res.send(err);
        });
    });
}
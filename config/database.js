const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize ('sgebd', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('não foi possível conectar ao banco de dados:', err);
    });
    
module.exports = sequelize;
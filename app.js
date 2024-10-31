const express = require('express');
const rotas = require('./routes/routes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json()); 

app.use('/api', rotas);

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Banco de dados conectado');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados: ', error);
    }
};

startServer();

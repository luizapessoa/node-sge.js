const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dataCompra: {
        type: DataTypes.DATE,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        },
        allowNull: false,
    }
});


Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
    Pedido.hasMany(models.DetalhePedido, { foreignKey: 'pedidoId' }); 
};

module.exports = Pedido;

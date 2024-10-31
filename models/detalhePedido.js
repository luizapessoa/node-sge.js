const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalhePedido = sequelize.define('DetalhePedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
        },
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'pedidos', 
            key: 'id',
        },
        allowNull: false,
    },
    produtoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'produtos',
        },
        allowNull: false,
    },
});


DetalhePedido.associate = (models) => {
    DetalhePedido.belongsTo(models.Pedido, { foreignKey: 'pedidoId' });
    DetalhePedido.belongsTo(models.Produto, { foreignKey: 'produtoId' });
};

module.exports = DetalhePedido;

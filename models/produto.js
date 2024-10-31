const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        },
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categoria',
            key: 'id',
        },
        allowNull: true,
    },
}, 
{
    tableName: 'Produtos',
    timestamps: true,
});


Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
};

module.exports = Produto;

const Pedido = require('../models/pedido')
const Cliente = require('../models/cliente')

exports.criarPedido = async (req, res) => {
    try {
        const { clienteId, dataCompra } = req.body;

        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'cliente nao encontrado' });
        }

        const novoPedido = await Pedido.create({
            clienteId,
            dataCompra: new Date(dataCompra) 
        });

        return res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({ message: 'erro ao criar pedido', error });
    }
};

exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll()
        res.status(200).json(pedidos)

    } catch (error) {
        res.status(500).json({ error: 'erro ao buscar pedidos'})
    }
}

exports.excluirPedido = async (req, res) => {
    try {
        const { id } = req.params

        const excluir = await Pedido.destroy({ where: {id} })

        if (excluir) {
            res.status(204).send('funcionando')
        } else {
            res.status(404).json({ error: 'pedido nao encontrado' })
        }

    } catch (error) {
        res.status(500).json({ error: 'erro ao excluir pedido' })
    }
}

exports.alterarPedido = async (req, res) => {
    try {
        const { id } = req.params
        const { dataCompra } = req.body
        
        const [updated] = await Pedido.update({ dataCompra }, { where: { id } })

        if (updated) {
            const pedidoAtualizado = await Pedido.findByPk(id)
            res.status(200).json(pedidoAtualizado)

        } else {
            res.status(404).json({ error: 'pedido nao encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'erro ao alterar pedido' })
    }
}

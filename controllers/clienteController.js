const Cliente = require('../models/cliente')

exports.criarCliente = async (req, res) => {
    try {
        const { nome, email } = req.body;
        const cliente = await Cliente.create({ nome, email });
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'erro ao adicionar cliente' });
    }
}

exports.todosClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
        res.status(200).json(clientes)

    } catch (error) {
        res.status(500).json({ error: 'erro ao buscar clientes'})
    }
}

exports.alterarCliente = async (req, res) => {
    try {
        const { id } = req.params
        const { nome } = req.body
        const { email } = req.body
        
        const [updated] = await Cliente.update({ nome }, { email }, { where: { id } })

        if (updated) {
            const clienteAtualizado = await Cliente.findByPk(id)
            res.status(200).json(clienteAtualizado)

        } else {
            res.status(404).json({ error: 'cliente nao encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'erro ao alterar cliente' })
    }
}

exports.excluirCliente = async (req, res) => {
    try {
        const { id } = req.params

        const excluir = await Cliente.destroy({ where: {id} })

        if (excluir) {
            res.status(204).send('funcionando')
        } else {
            res.status(404).json({ error: 'cliente nao encontrado' })
        }

    } catch (error) {
        res.status(500).json({ error: 'erro ao excluir cliente' })
    }
}
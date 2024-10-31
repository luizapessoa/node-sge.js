const Produto = require('../models/produto')

exports.criarProduto = async (req, res) => {
    try {
        const { nome, preco } = req.body; 
        const produto = await Produto.create({ nome, preco });
        res.status(201).json(produto);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'erro ao criar produto' });
    }
}

exports.todosProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll()
        res.status(200).json(produtos)

    } catch (error) {
        res.status(500).json({ error: 'erro ao buscar produtos'})
    }
}

exports.alterarProduto = async (req, res) => {
    try {
        const { id } = req.params
        const { nome } = req.body
        const { preco } = req.body
        
        const [updated] = await Produto.update({ nome }, { preco }, { where: { id } })

        if (updated) {
            const produtoAtualizado = await Produto.findByPk(id)
            res.status(200).json(produtoAtualizado)

        } else {
            res.status(404).json({ error: 'produto nao encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'erro ao alterar produto' })
    }
}

exports.excluirProduto = async (req, res) => {
    try {
        const { id } = req.params

        const excluir = await Produto.destroy({ where: {id} })

        if (excluir) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: 'produto nao encontrado' })
        }

    } catch (error) {
        res.status(500).json({ error: 'erro ao excluir produto' })
    }
}
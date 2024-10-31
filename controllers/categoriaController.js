const Categoria = require('../models/categoria');

exports.criarCategoria = async (req, res) => {
    const { nome } = req.body;
    try {
        const categoria = await Categoria.create({ nome });
        res.json(categoria);

    } catch (err) {
        res.status(500).json({ error: 'erro ao criar categoria '});;
    }
};

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'erro ao listar categorias' });
    }
};

exports.alterarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'categoria nao encontrada' })
        }
        categoria.nome = nome;
        await categoria.save();
        res.json(categoria);
    } catch (err) {
        res.status(500).json({ error: 'erro ao atualizar categoria' });
    }
};

exports.excluirCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'categoria nao encontrada'})
        }
        await categoria.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'erro ao excluir categoria'})
    }
}
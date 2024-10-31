const express = require('express');
const router = express.Router();
const DetalhePedido = require("../models/detalhePedido");

exports.criarDetalhePedido = async (req, res) => {
    const { pedidoId, quantidade, preco, desconto } = req.body;

    try {
        const detalhePedido = await DetalhePedido.create({
            pedidoId, 
            quantidade,
            preco,
            desconto,
        });

        res.status(201).json(detalhePedido);
    } catch (err) {
        console.error('erro ao criar detalhe do pedido:', err);
        res.status(500).json({ error: 'erro ao criar detalhe do pedido' });
    }
};


exports.listarDetalhes = async (req, res) => {
    try {
        const detalhes = await DetalhePedido.findAll();
        res.status(200).json(detalhes);
    } catch (error) {
        console.error('erro ao buscar detalhes:', error);
        res.status(500).json({ error: 'erro ao buscar detalhes' });
    }
};

exports.excluirDetalhe = async (req, res) => {
    try {
        const { id } = req.params;

        const excluir = await DetalhePedido.destroy({ where: { id } });

        if (excluir) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'detalhe do pedido não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'erro ao excluir detalhe do pedido' });
    }
};

exports.alterarDetalhe = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade, preco, desconto } = req.body;

        const [updated] = await DetalhePedido.update(
            { quantidade, preco, desconto },
            { where: { id } }
        );

        if (updated) {
            const detalheAtualizado = await DetalhePedido.findByPk(id);
            res.status(200).json(detalheAtualizado);
        } else {
            res.status(404).json({ error: 'detalhe do pedido não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'erro ao alterar detalhe do pedido' });
    }
};
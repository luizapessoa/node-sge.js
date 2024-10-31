const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth');

const clienteController = require('../controllers/clienteController');
const pedidoController = require('../controllers/pedidoController');
const categoriaController = require('../controllers/categoriaController')
const produtoController = require('../controllers/produtoController');
const detalheController = require('../controllers/detalheController');
const usuarioController = require('../controllers/usuarioController');


// rotas de USUARIO

router.post('/usuarios', usuarioController.criarUsuario);
router.post('/usuarios/login', usuarioController.logarUsuario);
router.get('/usuarios', auth, usuarioController.listarUsuarios);

// rotas de CLIENTE

router.post('/clientes', auth, clienteController.criarCliente);
router.get('/clientes', auth, clienteController.todosClientes);
router.put('/clientes/:id', auth, clienteController.alterarCliente);
router.delete('/clientes/:id', auth, clienteController.excluirCliente);

// rotas de PEDIDO

router.post('/pedidos', auth, pedidoController.criarPedido)
router.get('/pedidos', auth, pedidoController.listarPedidos)
router.put('/pedidos/:id', auth, pedidoController.alterarPedido)
router.delete('/pedidos/:id', auth, pedidoController.excluirPedido)

// rotas de DETALHE

router.post('/detalhes', auth, detalheController.criarDetalhePedido);
router.get('/detalhes', auth, detalheController.listarDetalhes);
router.delete('/detalhes/:id', auth, detalheController.excluirDetalhe);
router.put('/detalhes/:id', auth, detalheController.alterarDetalhe);

// rotas de PRODUTO

router.post('/produtos', auth, produtoController.criarProduto);
router.get('/produtos', auth, produtoController.todosProdutos);
router.put('/produtos/:id', auth, produtoController.alterarProduto);
router.delete('/produtos/:id', auth, produtoController.excluirProduto);

// rotas de CATEGORIA

router.post('/categorias', auth, categoriaController.criarCategoria);
router.get('/categorias', auth, categoriaController.listarCategorias);
router.put('/categorias/:id', auth, categoriaController.alterarCategoria);
router.delete('/categorias/:id', auth, categoriaController.excluirCategoria);

module.exports = router;

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.criarUsuario = async (req, res) => {
  const { login, senha } = req.body;
  const hashedSenha = await bcrypt.hash(senha, 10);
  
  try {
    const usuario = await Usuario.create({ login, senha: hashedSenha });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'erro ao criar usuário' });
  }
};

exports.listarUsuarios = async (req, res) => {
    
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).json(usuarios)    
    } catch (error) {
        res.status(500).json({error: 'erro ao consultar usuarios'})
    }
};

exports.logarUsuario = async (req, res) => {
  const { login, senha } = req.body;

  try {
      const usuario = await Usuario.findOne({ where: { login } });

      if (!usuario) {
          return res.status(401).json({ error: 'login ou senha inválidos' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
          return res.status(401).json({ error: 'login ou senha inválidos' });
      }

      const token = jwt.sign({ id: usuario.id }, 'seu_segredo_aqui', { expiresIn: '1h' }); 

      res.json({ usuario, token });
  } catch (error) {
      res.status(500).json({ error: 'erro ao realizar login' });
  }
};

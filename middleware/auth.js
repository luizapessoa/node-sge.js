const jwt = require('jsonwebtoken');
const JWT_SECRET = 'chave_secreta';

const authMiddleware = (req, res, next) => {
    
  const token = req.header('authorization').replace('bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'acesso negado. token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.usuario = decoded;
    
    next(); 
  } catch (err) {
    res.status(401).json({ error: 'token inválido.' });
  }
};

module.exports = authMiddleware;
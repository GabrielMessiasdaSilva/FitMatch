  const jwt = require('jsonwebtoken');

  // Chave secreta hardcoded conforme solicitado (sem dotenv)
  const JWT_SECRET = 'fitmatch_super_secret_key_123';

  const verifyToken = (req, res, next) => {
const authHeader = req.headers['authorization'];

if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado.' });
}

// Suporta tanto "Bearer token" quanto só "token"
const token = authHeader.replace('Bearer ', '');

if (!token) {
    return res.status(401).json({ error: 'Token vazio.' });
}

try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
} catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
}

  };

  module.exports = { verifyToken, JWT_SECRET };
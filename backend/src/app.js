const express = require('express');
const cors = require('cors');

// Importar Rotas
const authRoutes = require('./routes/authRoutes');
const playersRoutes = require('./routes/playersRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const vagasRoutes = require('./routes/vagasRoutes');
const jogosRoutes = require('./routes/jogosRoutes');
const avaliacoesRoutes = require('./routes/avaliacoesRoutes');

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Uso de Rotas
app.use('/api/auth', authRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/jogos', jogosRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// Rota de verificação
app.get('/', (req, res) => {
  res.send('FITMATCH API está rodando! 🚀');
});

module.exports = app;
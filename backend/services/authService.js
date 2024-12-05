require('dotenv').config({ path: './.env.auth' });
const express = require('express');
const connectDB = require('../config/dbAuth'); // Importa conexão com o banco
const authRoutes = require('../routes/authRoutes');
const corsMiddleware = require('../middlewares/corsMiddleware'); // Importa o CORS centralizado

const app = express();
app.use(express.json());
app.use(corsMiddleware); // Aplica o middleware de CORS

// Conecta ao banco
connectDB(process.env.MONGO_URI);

// Rotas
app.use('/auth', authRoutes);

// Porta do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth Service rodando na porta ${PORT}`);
});

require('dotenv').config({ path: './.env.boletins' });
const path = require('path');
const express = require('express');
const connectDB = require('./config/dbBoletins'); // Importa conexão com o banco
const boletinsRoutes = require('./routes/boletinsRoutes');
const corsMiddleware = require('./middlewares/corsMiddleware'); // Importa o CORS centralizado

const app = express();
app.use(express.json());
app.use(corsMiddleware); // Aplica o middleware de CORS

// Middleware para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conecta ao banco
connectDB(process.env.MONGO_URI);

// Rotas
app.use('/api/boletins', boletinsRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Microsserviço de Boletins rodando na porta ${PORT}`);
});

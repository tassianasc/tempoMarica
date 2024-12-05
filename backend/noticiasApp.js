require('dotenv').config({ path: './.env.noticias' });
const express = require('express');
const path = require('path');
const connectDB = require('./config/dbNoticias'); // Importa conexão com o banco
const noticiasRoutes = require('./routes/noticiasRoutes');
const corsMiddleware = require('./middlewares/corsMiddleware'); // Importa o CORS centralizado

const app = express();
app.use(express.json());
app.use(corsMiddleware); // Aplica o middleware de CORS

// Conecta ao banco
connectDB(process.env.MONGO_URI);

// Middleware para servir arquivos estáticos da pasta 'uploads/galeria'
app.use('/galeria', express.static(path.join(__dirname, 'uploads/galeria')));

// Rotas
app.use('/api/noticias', noticiasRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Microsserviço de Notícias rodando na porta ${PORT}`);
});

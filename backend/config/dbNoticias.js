const mongoose = require('mongoose');

let isConnected = false; // Controla se a conexão já foi feita

const connectDB = async (mongoURI) => {
    if (!mongoURI) {
        console.error('A URI do banco não foi fornecida!');
        process.exit(1);
    }

    if (isConnected) {
        console.log('Já conectado ao banco de notícias.');
        return;
    }

    try {
        await mongoose.connect(mongoURI); // Remova as opções depreciação
        isConnected = true; // Marca a conexão como bem-sucedida
        console.log('Conectado ao banco de notícias com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de notícias:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

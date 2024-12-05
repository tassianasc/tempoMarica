const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
    if (!mongoURI) {
        console.error('A URI do banco não foi fornecida!');
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoURI); // Remova as opções depreciação
        console.log('Conectado ao banco Boletins com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao banco Boletins:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDBAuth = async (mongoURI) => {
    if (!mongoURI) {
        console.error('A URI do banco de autenticação não foi fornecida!');
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoURI);
        console.log('Conectado ao banco de autenticação');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB (Autenticação):', err.message);
        process.exit(1);
    }
};

module.exports = connectDBAuth;

const cors = require('cors');

// Configuração de CORS
const corsOptions = {
    origin: "http://127.0.0.1:5500", // endereço do front-end
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-custom-auth"],
};

module.exports = cors(corsOptions);

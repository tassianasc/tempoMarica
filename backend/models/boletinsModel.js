const mongoose = require('mongoose');

const boletinsSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Título do boletim
    pdf: { type: String, required: true }, // Nome do arquivo PDF
    createdAt: { type: Date, default: Date.now } // Data de criação
});

module.exports = mongoose.model('Boletim', boletinsSchema);
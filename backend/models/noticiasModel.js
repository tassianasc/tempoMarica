const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    subtitulo: {
        type: String,
    },
    descricao: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
        enum: ['Tássia Nascimento', 'Mateus Chagas'], // Restringe os valores permitidos
    },
    dataPublicacao: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {  
        type: String,
        required: false,  
    }
});

module.exports = mongoose.model('Noticia', noticiaSchema);
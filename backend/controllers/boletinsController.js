const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importando o módulo fs para manipulação de arquivos
const Boletim = require('../models/boletinsModel');

// Configuração do multer para upload de arquivos PDF
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Certifique-se que a pasta 'uploads' existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único do arquivo
    }
});

// Configuração do upload
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos PDF são permitidos'), false);
        }
    }
});

// Função para criar um boletim com o upload de PDF
exports.createBoletim = [
    upload.single('pdf'), 
    async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo PDF foi enviado.' });
            if (!req.body.title) return res.status(400).json({ error: 'O título é obrigatório.' });

            const boletim = new Boletim({
                title: req.body.title,
                pdf: req.file.filename,
            });
            await boletim.save();
            res.status(201).json({ message: 'Boletim criado com sucesso!', boletim });
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar boletim', message: error.message });
        }
    }
];

// Função para listar todos os boletins
exports.getAll = async (req, res) => {
    try {
        const boletins = await Boletim.find().sort({ createdAt: -1 }); // Ordena por data decrescente
        res.status(200).json(boletins);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar boletins', message: error.message });
    }
};

// Função para buscar o boletim mais recente
exports.getLatestBoletim = async (req, res) => {
    try {
        const boletim = await Boletim.findOne().sort({ createdAt: -1 }); // Ordena por data decrescente e pega o primeiro
        if (!boletim) {
            return res.status(404).json({ message: "Nenhum boletim encontrado" });
        }
        res.status(200).json(boletim);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o boletim mais recente", message: error.message });
    }
};

// Função para deletar um boletim pelo ID
exports.deleteBoletim = async (req, res) => {
    try {
        const { id } = req.params;
        const boletim = await Boletim.findById(id);
        
        if (!boletim) return res.status(404).json({ message: 'Boletim não encontrado' });

        // Remover o arquivo PDF da pasta 'uploads/'
        const pdfPath = path.join(__dirname, '../uploads', boletim.pdf);
        if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);  // Deletar o arquivo
        }

        await Boletim.findByIdAndDelete(id);
        res.status(200).json({ message: 'Boletim deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao deletar boletim', message: error.message });
    }
};
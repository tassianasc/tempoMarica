const Noticia = require("../models/noticiasModel");
const path = require("path");
const fs = require("fs");

// Obter todas as notícias
exports.getAll = async (req, res) => {
    try {
        const noticias = await Noticia.find();

        // Adiciona o campo imageUrl com o caminho completo da imagem
        const noticiasComImagem = noticias.map((noticia) => ({
            ...noticia._doc, // Inclui todos os dados da notícia
            imageUrl: noticia.imageUrl
                ? `${req.protocol}://${req.get("host")}/galeria/${noticia.imageUrl}`
                : null,
        }));

        res.status(200).json(noticiasComImagem);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar notícias" });
    }
};

// Criar uma nova notícia com imagem
exports.create = async (req, res) => {
    try {
        const autoresPermitidos = ["Tássia Nascimento", "Mateus Chagas"];
        if (!autoresPermitidos.includes(req.body.autor)) {
            return res.status(400).json({ error: "Autor inválido." });
        }

        const noticia = new Noticia({
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            descricao: req.body.descricao,
            autor: req.body.autor,
            imageUrl: req.file ? req.file.filename : null, // Salva apenas o nome do arquivo
        });

        await noticia.save();
        res.status(201).json(noticia);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar notícia", message: error.message });
    }
};

// Deletar uma notícia por ID
exports.deleteNoticia = async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) return res.status(404).json({ message: "Notícia não encontrada" });

        // Remover a imagem da pasta 'uploads/galeria'
        if (noticia.imageUrl) {
            const imagePath = path.join(__dirname, "../uploads/galeria", path.basename(noticia.imageUrl));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Deletar o arquivo
            }
        }

        await noticia.deleteOne();
        res.json({ message: "Notícia deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter uma notícia por ID
exports.getById = async (req, res) => {
    try {
        const noticia = await Noticia.findById(req.params.id);
        if (!noticia) {
            return res.status(404).json({ error: "Notícia não encontrada." });
        }

        // Adiciona o campo imageUrl com o caminho completo da imagem
        const noticiaComImagem = {
            ...noticia._doc,
            imageUrl: noticia.imageUrl
                ? `${req.protocol}://${req.get("host")}/galeria/${noticia.imageUrl}`
                : null,
        };

        res.status(200).json(noticiaComImagem);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar a notícia." });
    }
};

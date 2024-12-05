const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/authMiddleware");
const noticiasController = require("../controllers/noticiasController");
const multer = require("multer");
const path = require("path");

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/galeria")); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único do arquivo
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Verifica se o arquivo é uma imagem
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Apenas arquivos de imagem são permitidos"), false);
        }
    },
});

// Rotas públicas
router.get("/", noticiasController.getAll); // Listar todas as notícias
router.get("/:id", noticiasController.getById); // Obter notícia por ID

// Rotas protegidas
router.post("/", checkToken, upload.single("imageUrl"), noticiasController.create); // Criar notícia
router.delete("/:id", checkToken, noticiasController.deleteNoticia); // Deletar notícia

module.exports = router;

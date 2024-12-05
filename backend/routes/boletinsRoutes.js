const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/authMiddleware");
const boletinsController = require("../controllers/boletinsController");

// Rotas públicas
router.get("/", boletinsController.getAll); // Listar todos os boletins
router.get("/latest", boletinsController.getLatestBoletim); // Buscar o último boletim

// Rotas protegidas
router.post("/", checkToken, boletinsController.createBoletim); // Criar boletim
router.delete("/:id", checkToken, boletinsController.deleteBoletim); // Deletar boletim

module.exports = router;

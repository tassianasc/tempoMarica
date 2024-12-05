const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/authMiddleware"); // Importar o middleware de autenticação
const userController = require("../controllers/userController");

// Rotas públicas
router.post("/login", userController.login); // Login de usuário

// Rotas protegidas
router.post("/register", checkToken, userController.register); // Registro de usuário protegido por token

module.exports = router;

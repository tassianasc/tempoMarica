const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Middleware para criptografar senha antes de salvar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Gera o salt com fator de custo 10
        this.password = await bcrypt.hash(this.password, salt); // Criptografa a senha
        next();
    } catch (err) {
        return next(err); // Lida com erros durante a criptografia
    }
});

module.exports = mongoose.model('User', UserSchema);

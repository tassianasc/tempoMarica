const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
exports.register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || password !== confirmpassword) {
        return res.status(422).json({ msg: 'Dados inválidos ou senhas não conferem!' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(422).json({ msg: 'E-mail já está em uso!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ msg: 'Erro no servidor', error: err.message });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ msg: 'Senha inválida!' });

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Erro no servidor', error: err.message });
    }
};

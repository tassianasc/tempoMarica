const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    const token = req.headers["x-custom-auth"];
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado! Token ausente." });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).json({ msg: "Token inválido!" });
    }
};

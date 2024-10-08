const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.user = user;
        next();  // Continúa con la siguiente función si la autenticación es correcta
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;  // Asegúrate de que está exportando la función

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body; // Aceptamos el rol desde el body

    try {
        // Verificar si el email ya está registrado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Crear el nuevo usuario con el rol proporcionado o gamer por defecto
        const user = new User({ 
            name, 
            email, 
            password, 
            role: role || 'gamer' 
        });

        await user.save(); // Guardamos el usuario en la base de datos

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por su email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT con una duración de 1 hora
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Almacenamos también el rol en el token
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

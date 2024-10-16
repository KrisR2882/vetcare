const bcrypt = require('bcrypt');
const User = require('../models/User'); // Asegúrate de que esta ruta sea correcta

// Método para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne(email);
        if (existingUser) {
            return res.status(400).json({ error: "El correo ya está en uso." });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create(username, email, hashedPassword);

        res.status(201).json({ message: "Usuario registrado", userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario." });
    }
};

// Método para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne(email); // Asegúrate de que el método existe en tu modelo
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales inválidas." });
        }
        req.session.userId = user.id;

        res.status(200).json({ message: "Inicio de sesión exitoso", idUser: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión." });
    }
};

// Método para cerrar sesión
const logoutUser = (req, res) => {
    

    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar la sesión:', err);
                return res.status(500).json({ error: "Error al cerrar sesión" });
            }
            res.clearCookie('connect.sid'); // Borra la cookie de sesión
            return res.status(200).json({ message: "Sesión cerrada correctamente" });
        });
    } else {
        return res.status(200).json({ message: "No hay sesión activa" });
    }
};


module.exports = { registerUser, loginUser, logoutUser }; // Asegúrate de exportar ambas funciones

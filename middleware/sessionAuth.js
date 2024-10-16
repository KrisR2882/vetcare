// sessionAuth.js (en la carpeta middleware)
const authenticateSession = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next(); // Si el usuario tiene una sesión activa, continúa
    } else {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
};

module.exports = authenticateSession;

const users = require('../config/authUsers'); // Usuarios predefinidos

const authenticateBasic = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Acceso denegado. Credenciales no proporcionadas.' });
    }

    // Decodificar las credenciales
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Buscar el usuario en la lista de usuarios predefinidos
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Continuar si las credenciales son correctas
    next();
};

module.exports = authenticateBasic;

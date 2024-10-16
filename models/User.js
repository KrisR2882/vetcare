const db = require('../config/db'); // Importa tu configuración de base de datos

const User = {
    create: async (username, email, password) => {
        try {
            const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
            return result.insertId; // Retorna el ID del nuevo usuario
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error; // Propaga el error
        }
    },

    findOne: async (email) => {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0]; // Retorna el primer usuario encontrado
        } catch (error) {
            console.error('Error al buscar el usuario:', error);
            throw error; // Propaga el error
        }
    }
};

module.exports = User;

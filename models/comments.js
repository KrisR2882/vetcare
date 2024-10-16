const db = require('../config/db');

const Comment = {
  create: async (userId, comment, rating) => {
    const [result] = await db.query('INSERT INTO comments (user_Id, comment, rating) VALUES (?, ?, ?)', [userId, comment, rating]);
    return result.insertId; // Asegúrate de que esto devuelva el ID del comentario
  },

  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM comments'); // Esta consulta debería traer todos los comentarios
    return rows; // Retorna los comentarios
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM comments WHERE user_Id = ?', [userId]);
    return rows; // Retorna los comentarios del usuario
  }
};

module.exports = Comment;

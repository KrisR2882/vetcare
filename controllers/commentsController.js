const Comment = require('../models/comments');

const commentsController = {
  createComment: async (req, res) => {
    const { comment, rating } = req.body; // Extraer comment y rating del cuerpo de la solicitud
    const userId = req.session.userId; // Cambié user_Id a userId

    // Verificar que el usuario esté autenticado
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Verificar que comment y rating no sean nulos o indefinidos
    if (!comment || rating === undefined) {
      return res.status(400).json({ message: 'Comentario y rating son requeridos.' });
    }

    

    try {
      // Asegúrate de pasar todos los parámetros necesarios al modelo
      await Comment.create(userId, comment, rating); // Asegúrate de que el modelo espera userId
      res.status(201).json({ message: 'Comentario creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el comentario:', error); // Log para más detalles
      res.status(500).json({ message: 'Error al crear el comentario' });
    }
  },

  getComments: async (req, res) => {
    try {
      const rows = await Comment.findAll(); // Asegúrate de que esto llame al método correcto
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error); // Log para más detalles
      res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
  },

  getCommentsByUser: async (req, res) => {
    const userId = req.params.id_user; // Cambié user_Id a userId

    try {
      const rows = await Comment.findByUserId(userId); // Asegúrate de que estás usando userId
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener los comentarios del usuario:', error); // Log para más detalles
      res.status(500).json({ message: 'Error al obtener los comentarios del usuario' });
    }
  }
};

module.exports = commentsController;

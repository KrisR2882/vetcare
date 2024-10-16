const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const authenticateBasic = require('../middleware/basicAuth');
const authenticateSession = require('../middleware/sessionAuth');

// Crear un nuevo comentario
router.post('/', authenticateSession, commentsController.createComment);

// Obtener todos los comentarios
router.get('/', authenticateBasic, commentsController.getComments);

// Obtener comentarios por ID de usuario
router.get('/user/:id_user', authenticateBasic, commentsController.getCommentsByUser);

module.exports = router;

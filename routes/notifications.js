const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController'); // Asegúrate de que esta ruta sea correcta
const authenticateBasic = require('../middleware/basicAuth');

// Rutas para las notificaciones
router.post('/',authenticateBasic, notificationsController.createNotification); // Asegúrate de que esta función esté definida
router.get('/',authenticateBasic, notificationsController.getAllNotifications); // Asegúrate de que esta función esté definida

module.exports = router;

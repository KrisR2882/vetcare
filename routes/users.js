const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController'); // Asegúrate de que esta ruta sea correcta
const authenticateBasic = require('../middleware/basicAuth');


// Rutas para registrar e iniciar sesión
router.post('/register',authenticateBasic, UsersController.registerUser); // Asegúrate de que registerUser esté definido
router.post('/login',authenticateBasic, UsersController.loginUser); // Asegúrate de que loginUser esté definido
router.post('/logout', authenticateBasic, UsersController.logoutUser); 

module.exports = router;

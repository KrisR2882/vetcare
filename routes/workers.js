const express = require('express');
const router = express.Router();
const WorkersController = require('../controllers/workersController');
const authenticateBasic = require('../middleware/basicAuth');

router.post('/',authenticateBasic, WorkersController.createWorker); // Para crear un trabajador
router.get('/',authenticateBasic, WorkersController.getAllWorkers); // Para obtener todos los trabajadores

module.exports = router;

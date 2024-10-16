const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/servicesController');
const authenticateBasic = require('../middleware/basicAuth');

router.post('/',authenticateBasic, ServicesController.createService); // Para crear un servicio
router.get('/',authenticateBasic, ServicesController.getAllServices); // Para obtener todos los servicios

module.exports = router;

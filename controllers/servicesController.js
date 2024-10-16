const Service = require('../models/service');

exports.createService = async (req, res) => {
    const { service_name, description, price } = req.body;
    try {
        const serviceId = await Service.create(service_name, description, price);
        res.status(201).json({ message: "Servicio creado con éxito", serviceId });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el servicio" });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los servicios" });
    }
};

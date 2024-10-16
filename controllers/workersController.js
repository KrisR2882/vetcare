    const Worker = require('../models/worker');

    exports.createWorker = async (req, res) => {
        const { name, role, bio } = req.body;
        try {
            const workerId = await Worker.create(name, role, bio);
            res.status(201).json({ message: "Trabajador creado con éxito", workerId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el trabajador" });
        }
    };

    exports.getAllWorkers = async (req, res) => {
        try {
            const workers = await Worker.findAll();
            res.status(200).json(workers);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los trabajadores" });
        }
    };

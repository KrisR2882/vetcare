const Notification = require('../models/notifications'); // Asegúrate de que esta ruta sea correcta

const createNotification = async (req, res) => {
    const {message } = req.body;
    try {
        const notificationId = await Notification.create(message);
        res.status(201).json({ id: notificationId, message: 'Notificación creada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la notificación', error });
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
};

module.exports = {
    createNotification,
    getAllNotifications
};

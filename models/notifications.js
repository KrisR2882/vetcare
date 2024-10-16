const db = require('../config/db');

class Notification {
    static async create(message) {
        const [result] = await db.query('INSERT INTO notifications (message) VALUES (?)', [message]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM notifications');
        return rows;
    }
}

module.exports = Notification;

const db = require('../config/db');

class Service {
    static async create(service_name, description, price) {
        const [result] = await db.query('INSERT INTO services (service_name, description, price) VALUES (?, ?, ?)', [service_name, description, price]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM services');
        return rows;
    }
}

module.exports = Service;

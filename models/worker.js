const db = require('../config/db');

class Worker {
    static async create(name, role, bio) {
        const [result] = await db.query('INSERT INTO workers (name, role, bio) VALUES (?, ?, ?)', [name, role, bio]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM workers');
        return rows;
    }
}

module.exports = Worker;

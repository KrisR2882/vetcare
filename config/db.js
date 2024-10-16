const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vetcare'
};

const pool = mysql.createPool(dbConfig);

// Probar la conexión
pool.getConnection()
    .then((connection) => {
        console.log('Conectado a la base de datos MySQL');
        connection.release(); // Libera la conexión
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = pool;

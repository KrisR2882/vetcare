const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'vetcare_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true en producción
}));

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/services', require('./routes/services'));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


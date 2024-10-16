// routes/home.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        vision: "Ser la mejor veterinaria en el cuidado de mascotas.",
        mision: "Brindar servicios de salud de calidad a las mascotas con profesionalismo y amor.",
        direccion: "123 Calle Falsa, Ciudad, País"
    });
});

module.exports = router;

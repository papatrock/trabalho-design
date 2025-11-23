const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.criarReserva);

router.get('/reservas', (req, res) => {
    res.json({ message: "Listagem de reservas aqui" });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');


/**
 * @swagger
 * tags:
 *   - name: Reservas
 *     description: Gerenciamento de reservas
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Cria uma nova reserva
 *     tags:
 *       - Reservas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       '201':
 *         description: Reserva criada com sucesso
 *       '409':
 *         description: Conflito (Double Booking)
 *       '500':
 *         description: Erro no servidor
 *   get:
 *     summary: Lista todas as reservas
 *     tags:
 *       - Reservas
 *     responses:
 *       '200':
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Listagem de reservas aqui"
 */
router.post('/reservas', reservaController.criarReserva);
router.get('/reservas', (req, res) => {
    res.json({ message: "Listagem de reservas aqui" });
});

module.exports = router;
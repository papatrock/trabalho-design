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
router.get('/reservas', reservaController.buscarReservas);

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
 *
 *
  */
router.post('/reservas', reservaController.criarReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtém uma reserva por ID
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       '200':
 *         description: Reserva encontrada
 *       '404':
 *         description: Reserva não encontrada
 *       '500':
 *         description: Erro no servidor
 */
router.get('/reservas/:id', reservaController.buscarReservaPorId);


/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Atualiza uma reserva existente
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       '200':
 *         description: Reserva atualizada com sucesso
 *       '404':
 *         description: Reserva não encontrada
 *       '500':
 *         description: Erro no servidor
 */
 router.put('/reservas/:id', reservaController.atualizarReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Deleta uma reserva existente
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     responses:
 *       '200':
 *         description: Reserva deletada com sucesso
 *       '404':
 *         description: Reserva não encontrada
 *       '500':
 *         description: Erro no servidor
 */
router.delete('/reservas/:id', reservaController.deletarReserva);

module.exports = router;
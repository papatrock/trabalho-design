const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/ReservaController');
const usuarioController = require('../controllers/UsuarioController');
const espacoController = require('../controllers/EspacoController');
const pagamentoController = require('../controllers/PagamentoController');

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
 */
router.get('/reservas', reservaController.buscarReservas);
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
router.get('/reservas/:id', reservaController.buscarReservaPorId);
router.put('/reservas/:id', reservaController.atualizarReserva);
router.delete('/reservas/:id', reservaController.deletarReserva);


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '201':
 *         description: Usuário criado
 *       '501':
 *         description: Não implementado
 *   get:
 *     summary: Lista usuários
 *     tags:
 *       - Usuarios
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 *   put:
 *     summary: Atualiza usuário
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 *   delete:
 *     summary: Remove usuário
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.deletarUsuario);

/**
 * @swagger
 * /espacos:
 *   post:
 *     summary: Cadastra um novo espaço
 *     tags:
 *       - Espacos
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Espaco'
 *     responses:
 *       '501':
 *         description: Não implementado
 *   get:
 *     summary: Lista espaços disponíveis
 *     tags:
 *       - Espacos
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.post('/espacos', espacoController.criarEspaco);
router.get('/espacos', espacoController.listarEspacos);

/**
 * @swagger
 * /espacos/{id}:
 *   get:
 *     summary: Busca espaço por ID
 *     tags:
 *       - Espacos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 *   put:
 *     summary: Atualiza dados do espaço
 *     tags:
 *       - Espacos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 *   delete:
 *     summary: Remove/Desativa um espaço
 *     tags:
 *       - Espacos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.get('/espacos/:id', espacoController.buscarEspacoPorId);
router.put('/espacos/:id', espacoController.atualizarEspaco);
router.delete('/espacos/:id', espacoController.deletarEspaco);

/**
 * @swagger
 * /pagamentos:
 *   post:
 *     summary: Processa um novo pagamento
 *     tags:
 *       - Pagamentos
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pagamento'
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.post('/pagamentos', pagamentoController.processarPagamento);

/**
 * @swagger
 * /pagamentos/{id}:
 *   get:
 *     summary: Busca detalhes do pagamento
 *     tags:
 *       - Pagamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 *   delete:
 *     summary: Estorna/Cancela um pagamento
 *     tags:
 *       - Pagamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '501':
 *         description: Não implementado
 */
router.get('/pagamentos/:id', pagamentoController.buscarPagamentoPorId);
router.delete('/pagamentos/:id', pagamentoController.estornarPagamento);

module.exports = router;
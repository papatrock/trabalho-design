const reservaService = require('../services/reservaService');


class ReservaController {

    async criarReserva(req, res) {
        try {
            const dadosReserva = req.body;

            const novaReserva = await reservaService.processarNovaReserva(dadosReserva);

            return res.status(201).json({
                success: true,
                message: "Reserva criada com sucesso!",
                data: novaReserva
            });

        } catch (error) {
            console.error("Erro no controller:", error);

            if (error.message === 'DOUBLE_BOOKING') {
                return res.status(409).json({ error: "Este espaço já está reservado para esta data." });
            }

            return res.status(500).json({ error: "Erro interno ao processar reserva." });
        }
    }
}

module.exports = new ReservaController();
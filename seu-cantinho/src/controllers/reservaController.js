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

    async buscarReservas(requisicao, resposta){
        const reservas = await reservaService.buscarTodos();

        return resposta.json({reservas})
    }

    async buscarReservaPorId(requisicao, resposta){
        const {id} = requisicao.params;

        const reserva = await reservaService.buscarPorId(id);

        if(!reserva){
            return resposta.status(404).json({error: 'Reserva não encontrada'});
        }

        return resposta.json({reserva});
    }

    async atualizarReserva(requisicao, resposta) {
        // se a data mudar, validade disponibilidade antes
    }

    async deletarReserva(requisicao, resposta) {

    }
}

module.exports = new ReservaController();
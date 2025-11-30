const reservaService = require('../services/ReservaService');


class ReservaController {

    async criarReserva(req, res) {
        try {
            const dadosReserva = req.body;

            const novaReserva = await reservaService.criarReserva(dadosReserva);

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
        try {
          const { id } = requisicao.params;
          const dados = requisicao.body;

          const reservaAtualizada = await reservaService.atualizarReserva(id, dados);

          return resposta.json({
              success: true,
              message: "Atualizado com sucesso.", data: reservaAtualizada
          });

        } catch (error) {
            console.error("Erro update:", error);
            if (error.message === 'RESERVA_NAO_ENCONTRADA')
                return resposta.status(404).json({ error: "Reserva não encontrada." });
            if (error.message === 'DOUBLE_BOOKING')
                return resposta.status(409).json({ error: "Conflito: Nova data/local já ocupados." });
            return resposta.status(500).json({ error: "Erro interno." });
        }
    }

    async deletarReserva(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            await reservaService.deletarReserva(id);
            return resposta.json({ success: true, message: `Reserva ${id} foi excluída com sucesso.` });
        } catch (error) {
            if (error.message === 'RESERVA_NAO_ENCONTRADA') return resposta.status(404).json({ error: "Reserva não encontrada." });
            return resposta.status(500).json({ error: "Erro ao excluir." });
        }
    }

    async buscarReservasPorUsuario(req, res) {
        try {
            const { usuarioId } = req.query;

            if (!usuarioId) {
                return res.status(400).json({ error: "Parâmetro usuarioId é obrigatório." });
            }
            const reservas = await reservaService.buscarReservasPorUsuario(usuarioId);

            return res.json({ reservas });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}

module.exports = new ReservaController();
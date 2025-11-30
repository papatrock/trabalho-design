const pagamentoService = require('../services/PagamentoService');

class PagamentoController {

    async processarPagamento(req, res) {
        try {
            // Esse método deve ser chamado para efetivar um pagamento
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async buscarPagamentoPorId(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async estornarPagamento(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}

module.exports = new PagamentoController();
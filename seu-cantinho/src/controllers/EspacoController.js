const espacoService = require('../services/EspacoService');

class EspacoController {

    async criarEspaco(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async listarEspacos(req, res) {
        try {
            // Dica: Implementar filtros por filial aqui (req.query.filialId)
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async buscarEspacoPorId(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async atualizarEspaco(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async deletarEspaco(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}

module.exports = new EspacoController();
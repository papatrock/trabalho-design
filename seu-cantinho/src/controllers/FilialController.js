const filialService = require('../services/FilialService');

class FilialController {

    async listarFiliais(req, res) {
        try {
            const filiais = await filialService.listar();
            return res.json({ filiais });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar filiais" });
        }
    }

    async buscarFilialPorId(req, res) {
        try {
            const { id } = req.params;
            const filial = await filialService.buscarPorId(id);
            if (!filial) return res.status(404).json({ error: "Filial não encontrada" });
            return res.json({ filial });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async criarFilial(req, res) {
        try {
            const dados = req.body;
            if (!dados.nome || !dados.estado) {
                return res.status(400).json({ error: "Nome e Estado são obrigatórios." });
            }
            const novaFilial = await filialService.criarFilial(dados);
            return res.status(201).json({ success: true, data: novaFilial });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar filial" });
        }
    }

    async atualizarFilial(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const filial = await filialService.atualizarFilial(id, dados);
            if (!filial) return res.status(404).json({ error: "Filial não encontrada" });
            return res.json({ success: true, data: filial });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar" });
        }
    }

    async deletarFilial(req, res) {
        try {
            const { id } = req.params;
            await filialService.deletarFilial(id);
            return res.json({ success: true, message: "Filial removida." });
        } catch (error) {
            if (error.message === 'FILIAL_TEM_ESPACOS') {
                return res.status(409).json({ error: "Não é possível excluir: Esta filial possui espaços cadastrados." });
            }
            return res.status(500).json({ error: "Erro ao deletar" });
        }
    }
}

module.exports = new FilialController();
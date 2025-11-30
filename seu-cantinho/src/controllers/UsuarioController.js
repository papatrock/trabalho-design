const usuarioService = require('../services/UsuarioService');

class UsuarioController {

    async criarUsuario(req, res) {
        try {
            // await usuarioService.criar(req.body);
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async listarUsuarios(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async buscarUsuarioPorId(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async atualizarUsuario(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async deletarUsuario(req, res) {
        try {
            return res.status(501).json({ message: "wip" });
        } catch (error) {
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}

module.exports = new UsuarioController();
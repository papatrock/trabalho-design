const usuarioService = require('../services/UsuarioService');

class UsuarioController {

    async criarUsuario(req, res) {
        try {
            const novoUsuario = await usuarioService.criar(req.body);
            return res.status(201).json({ success: true, data: novoUsuario });
        } catch (error) {
            if (error.message === 'EMAIL_JA_EXISTE') {
                return res.status(409).json({ error: "Email já cadastrado" });
            }
            return res.status(500).json({ error: "Erro interno" });
        }
    }

    async listarUsuarios(req, res) {
        const lista = await usuarioService.listar();
        return res.json(lista);
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

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const usuario = await usuarioService.login(email, senha);

            return res.json({
                success: true,
                message: "Login realizado com sucesso",
                usuario: usuario
            });

        } catch (error) {
            if (error.message === 'USUARIO_NAO_ENCONTRADO' || error.message === 'SENHA_INCORRETA') {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }
            return res.status(500).json({ error: "Erro interno" });
        }
    }
}

module.exports = new UsuarioController();
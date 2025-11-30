const db = require('../config/database');
const Usuario = require('../models/Usuario');

class UsuarioService {
    async criar(dados) {
        const client = await db.getClient();
        try {
            const existe = await Usuario.buscarPorEmail(client, dados.email);
            if (existe) throw new Error('EMAIL_JA_EXISTE');

            const novoUsuario = await Usuario.criar(client, dados);
            return novoUsuario;
        } finally {
            client.release();
        }
    }

    async listar() {
        return await Usuario.listar(db);
    }

    async buscarPorId(id) {

     }
    async atualizar(id, dados) {

     }
    async deletar(id) {

     }

     async login(email, senha) {
        const usuario = await Usuario.buscarPorEmail(db, email);

        if (!usuario) {
            throw new Error('USUARIO_NAO_ENCONTRADO');
        }

        if (usuario.senha !== senha) {
            throw new Error('SENHA_INCORRETA');
        }

        const { senha: _, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }
}

module.exports = new UsuarioService();
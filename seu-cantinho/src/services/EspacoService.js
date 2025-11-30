const db = require('../config/database');
const Espaco = require('../models/Espaco');

class EspacoService {
    async criarEspaco(dados) {
        const client = await db.getClient();
        try {
            // TODO validar se a filial existe aqui
            const novo = await Espaco.criar(client, dados);
            return novo;
        } finally {
            client.release();
        }
     }
    async buscarTodos() {
        return await Espaco.listar(db);
     }
    async buscarPorId(id) {
        return await Espaco.buscarPorId(db, id);
    }
    async atualizar(id, dados) {
        const client = await db.getClient();
        try {
            const atualizado = await Espaco.atualizar(client, id, dados);
            return atualizado;
        } finally {
            client.release();
        }
     }
    async deletarEspaco(id) {
        const client = await db.getClient();
        try {
            await Espaco.deletar(client, id);
            return true;
        } finally {
            client.release();
        }
    }
}

module.exports = new EspacoService();
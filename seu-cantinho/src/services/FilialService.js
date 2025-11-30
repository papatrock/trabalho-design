const db = require('../config/database');
const Filial = require('../models/Filial');

class FilialService {

    async listar() {
        return await Filial.listar(db);
    }

    async buscarPorId(id) {
        return await Filial.buscarPorId(db, id);
    }

    async criarFilial(dados) {
        const client = await db.getClient();
        try {
            const nova = await Filial.criar(client, dados);
            return nova;
        } finally {
            client.release();
        }
    }

    async atualizarFilial(id, dados) {
        const client = await db.getClient();
        try {
            const atualizada = await Filial.atualizar(client, id, dados);
            return atualizada;
        } finally {
            client.release();
        }
    }

    async deletarFilial(id) {
        const client = await db.getClient();
        try {
            await Filial.deletar(client, id);
            return true;
        } catch (error) {
            // cod do psql para violação de fk
            if (error.code === '23503') {
                throw new Error('FILIAL_TEM_ESPACOS');
            }
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = new FilialService();
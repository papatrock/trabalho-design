const db = require('../config/database');

class PagamentoService {
    async processar(dados) { throw new Error('Not Implemented'); }
    async buscarPorId(id) { throw new Error('Not Implemented'); }
    async estornar(id) { throw new Error('Not Implemented'); }
}

module.exports = new PagamentoService();
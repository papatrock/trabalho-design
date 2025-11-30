const db = require('../config/database');
const Espaco = require('../models/Espaco');

class EspacoService {
    async criar(dados) {

     }
    async buscarTodos() {
        return await Espaco.listar(db);
     }
    async buscarPorId(id) {

     }
    async atualizar(id, dados) {

     }
    async deletar(id) {

    }
}

module.exports = new EspacoService();
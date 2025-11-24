const db = require('../config/database');
const Reserva = require('../models/reserva');


class ReservaService {

    async buscarTodos(){
        return await Reserva.buscarTodos(db);
    }

    async processarNovaReserva(dados) {
        const client = await db.getClient();

        try {
            // pra evitar Double Booking
            await client.query('BEGIN');

            const estaDisponivel = await Reserva.verificarDisponibilidadeComLock(client, dados.espacoId, dados.data);

            if (!estaDisponivel) {
                throw new Error('DOUBLE_BOOKING');
            }

            // simula pagamento
            // TODO mocado por enquanto, implementar algo mais legal pra ter rollback??
            const pagamentoAprovado = this.mockProcessarPagamento();
            if (!pagamentoAprovado) {
                throw new Error('PAGAMENTO_RECUSADO');
            }

            const novaReserva = await Reserva.criar(client, dados);

            await client.query('COMMIT');

            return novaReserva;

        } catch (error) {
            // rollback
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // mock do pagamento, sempre true pro enquanto
    mockProcessarPagamento() {
        return true;
    }
}

module.exports = new ReservaService();
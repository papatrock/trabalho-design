const db = require('../config/database');
const Reserva = require('../models/reserva');


class ReservaService {

    async buscarTodos(){
        return await Reserva.buscarTodos(db);
    }

    async buscarPorId(id){
        return await Reserva.buscarPorId(db, id);
    }

    async criarReserva(dados) {
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

    async atualizarReserva(id, dados) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');
            const reservaAtual = await Reserva.buscarPorId(client, id);
            if (!reservaAtual) throw new Error('RESERVA_NAO_ENCONTRADA');

            const novaData = dados.data;
            const novoEspacoId = dados.espacoId;
            const mudouData = novaData && (new Date(novaData).getTime() !== new Date(reservaAtual.data_reserva).getTime());
            const mudouEspaco = novoEspacoId && (String(novoEspacoId) !== String(reservaAtual.espaco_id));

            if (mudouData || mudouEspaco) {
                const dataParaVerificar = novaData || reservaAtual.data_reserva;
                const espacoParaVerificar = novoEspacoId || reservaAtual.espaco_id;
                const disponivel = await Reserva.verificarDisponibilidadeComLock(client, espacoParaVerificar, dataParaVerificar);
                if (!disponivel) throw new Error('DOUBLE_BOOKING');
            }

            const reservaAtualizada = await Reserva.atualizarReserva(client, id, dados);
            await client.query('COMMIT');
            return reservaAtualizada;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async deletarReserva(id) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');

            const reserva = await Reserva.buscarPorId(client, id);
            if (!reserva) throw new Error('RESERVA_NAO_ENCONTRADA');

            //TODO deletar outras dependencias, pagamentos etc
            await Reserva.deletarReserva(client, id);

            await client.query('COMMIT');
            return true;
        } catch (error) {
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
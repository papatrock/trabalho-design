
class Reserva {

    async verificarDisponibilidadeComLock(client, espacoId, data) {
        /*
           const sql = `SELECT * FROM reservas
                        WHERE espaco_id = $1 AND data = $2
                        FOR UPDATE`;
        */

        // Mockando retorno para o exemplo funcionar sem criar tabelas agora
        console.log(`verificando disponibilidade (LOCK) para Espaço ${espacoId} na data ${data}`);
        return true;
    }

    async criar(client, dados) {
        /*
           const sql = `INSERT INTO reservas (cliente, espaco_id, data, valor)
                        VALUES ($1, $2, $3, $4) RETURNING *`;
        */
        console.log(`inserindo reserva para ${dados.cliente}`);
        return { id: 123, ...dados, status: 'CONFIRMADA' };
    }
}

module.exports = new Reserva();
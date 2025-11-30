
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

    async buscarTodos(pool) {
        const sql = `
            SELECT
                r.id,
                to_char(r.data_reserva, 'YYYY-MM-DD') as data,
                r.valor_total,
                r.status,
                c.nome as cliente_nome,
                e.nome as espaco_nome,
                f.estado as filial_estado
            FROM reservas r
            JOIN clientes c ON r.cliente_id = c.id
            JOIN espacos e ON r.espaco_id = e.id
            JOIN filiais f ON e.filial_id = f.id
            ORDER BY r.data_reserva DESC
        `;

        const result = await pool.query(sql);
        return result.rows;
    }

    async buscarPorId(pool, id) {
        const sql = `
            SELECT
                r.id,
                to_char(r.data_reserva, 'YYYY-MM-DD') as data,
                r.valor_total,
                r.status,
                c.nome as cliente_nome,
                e.nome as espaco_nome,
                f.estado as filial_estado
            FROM reservas r
            JOIN clientes c ON r.cliente_id = c.id
            JOIN espacos e ON r.espaco_id = e.id
            JOIN filiais f ON e.filial_id = f.id
            WHERE r.id = $1
        `;

        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = new Reserva();
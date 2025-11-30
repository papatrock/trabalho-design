
class Reserva {

    async verificarDisponibilidadeComLock(client, espacoId, data) {
          const sql = `
            SELECT id FROM reservas
            WHERE espaco_id = $1 AND data_reserva = $2
            FOR UPDATE
        `;
        const result = await client.query(sql, [espacoId, data]);
        return result.rows.length === 0;

        // Mockando retorno para o exemplo funcionar sem criar tabelas agora
        //console.log(`verificando disponibilidade (LOCK) para Espaço ${espacoId} na data ${data}`);
        //return true;
    }

    async criar(client, dados) {

        let clienteId = dados.usuarioId ||1;

        const sql = `
            INSERT INTO reservas (cliente_id, espaco_id, data_reserva, valor_total, status)
            VALUES ($1, $2, $3, 1000.00, 'CONFIRMADA')
            RETURNING id, data_reserva, status
        `;

        const result = await client.query(sql, [clienteId, dados.espacoId, dados.data]);
        return result.rows[0];
    }

    async buscarTodos(pool) {
        const sql = `
            SELECT
                r.id,
                to_char(r.data_reserva, 'YYYY-MM-DD') as data,
                r.valor_total,
                r.status,
                u.nome as cliente_nome,
                e.nome as espaco_nome,
                f.estado as filial_estado
            FROM reservas r
            JOIN usuarios u ON r.cliente_id = u.id
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
                u.nome as cliente_nome,
                e.nome as espaco_nome,
                f.estado as filial_estado
            FROM reservas r
            JOIN usuarios u ON r.cliente_id = u.id
            JOIN espacos e ON r.espaco_id = e.id
            JOIN filiais f ON e.filial_id = f.id
            WHERE r.id = $1
        `;

        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

     async atualizarReserva(client, id, dados) {
        const campos = [];
        const valores = [];
        let contador = 1;

        if (dados.espacoId) {
            campos.push(`espaco_id = $${contador++}`);
            valores.push(dados.espacoId);
        }
        if (dados.data) {
            campos.push(`data_reserva = $${contador++}`);
            valores.push(dados.data);
        }
        if (dados.status) {
            campos.push(`status = $${contador++}`);
            valores.push(dados.status);
        }

        if (campos.length === 0) return null;

        valores.push(id);

        const sql = `
            UPDATE reservas
            SET ${campos.join(', ')}
            WHERE id = $${contador}
            RETURNING id, data_reserva, status, espaco_id
        `;

        const result = await client.query(sql, valores);
        return result.rows[0];
    }

    async deletarReserva(client, id) {
        const sql = `DELETE FROM reservas WHERE id = $1 RETURNING id`;
        const result = await client.query(sql, [id]);
        return result.rows[0];
    }

    async buscarReservasPorUsuario(pool, usuarioId) {

        const sql = `
        SELECT
                r.id,
                to_char(r.data_reserva, 'YYYY-MM-DD') as data,
                r.valor_total,
                r.status,
                u.nome as cliente_nome,
                e.nome as espaco_nome,
                f.estado as filial_estado
            FROM reservas r
            JOIN usuarios u ON r.cliente_id = u.id
            JOIN espacos e ON r.espaco_id = e.id
            JOIN filiais f ON e.filial_id = f.id
            WHERE r.cliente_id = $1
            ORDER BY r.data_reserva DESC
        `;

        const result = await pool.query(sql, [usuarioId]);
        return result.rows;
    }
}

module.exports = new Reserva();
class Espaco {

    async listar(pool) {
        const sql = `
            SELECT
                e.id,
                e.nome,
                e.capacidade,
                e.preco_base,
                f.nome as filial_nome
            FROM espacos e
            JOIN filiais f ON e.filial_id = f.id
            WHERE e.disponivel = true
            ORDER BY e.nome ASC
        `;
        const result = await pool.query(sql);
        return result.rows;
    }

    async buscarPorId(pool, id) {
        const sql = `SELECT * FROM espacos WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = new Espaco();
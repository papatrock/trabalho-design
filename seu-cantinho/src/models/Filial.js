class Filial {

    async listar(pool) {
        const sql = `SELECT * FROM filiais ORDER BY nome ASC`;
        const result = await pool.query(sql);
        return result.rows;
    }

    async buscarPorId(pool, id) {
        const sql = `SELECT * FROM filiais WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

    async criar(client, dados) {
        const sql = `
            INSERT INTO filiais (nome, estado, endereco)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await client.query(sql, [dados.nome, dados.estado, dados.endereco]);
        return result.rows[0];
    }

    async atualizar(client, id, dados) {
        const campos = [];
        const valores = [];
        let contador = 1;

        if (dados.nome) { campos.push(`nome = $${contador++}`); valores.push(dados.nome); }
        if (dados.estado) { campos.push(`estado = $${contador++}`); valores.push(dados.estado); }
        if (dados.endereco) { campos.push(`endereco = $${contador++}`); valores.push(dados.endereco); }

        if (campos.length === 0) return null;

        valores.push(id);
        const sql = `UPDATE filiais SET ${campos.join(', ')} WHERE id = $${contador} RETURNING *`;

        const result = await client.query(sql, valores);
        return result.rows[0];
    }

    async deletar(client, id) {
        // só pode deletar se não tiver espaços vinculados
        const sql = `DELETE FROM filiais WHERE id = $1 RETURNING id`;
        const result = await client.query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = new Filial();
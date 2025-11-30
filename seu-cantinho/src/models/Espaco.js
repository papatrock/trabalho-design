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

    async criar(client, dados) {
        const sql = `
            INSERT INTO espacos (nome, filial_id, capacidade, preco_base, descricao)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        console.log("DADOS NO MODEL", dados);
        const result = await client.query(sql, [
            dados.nome,
            dados.filialId,
            dados.capacidade,
            dados.precoBase,
            dados.descricao
        ]);
        return result.rows[0];
    }

    async atualizar(client, id, dados) {
        const campos = [];
        const valores = [];
        let contador = 1;

        if (dados.nome) { campos.push(`nome = $${contador++}`); valores.push(dados.nome); }
        if (dados.capacidade) { campos.push(`capacidade = $${contador++}`); valores.push(dados.capacidade); }
        if (dados.precoBase) { campos.push(`preco_base = $${contador++}`); valores.push(dados.precoBase); }
        if (dados.descricao) { campos.push(`descricao = $${contador++}`); valores.push(dados.descricao); }

        if (campos.length === 0) return null;

        valores.push(id);
        const sql = `UPDATE espacos SET ${campos.join(', ')} WHERE id = $${contador} RETURNING *`;

        const result = await client.query(sql, valores);
        return result.rows[0];
    }

    async atualizar(client, id, dados) {
        const campos = [];
        const valores = [];
        let contador = 1;

        if (dados.nome) { campos.push(`nome = $${contador++}`); valores.push(dados.nome); }
        if (dados.capacidade) { campos.push(`capacidade = $${contador++}`); valores.push(dados.capacidade); }
        if (dados.precoBase) { campos.push(`preco_base = $${contador++}`); valores.push(dados.precoBase); }
        if (dados.descricao) { campos.push(`descricao = $${contador++}`); valores.push(dados.descricao); }

        if (campos.length === 0) return null;

        valores.push(id);
        const sql = `UPDATE espacos SET ${campos.join(', ')} WHERE id = $${contador} RETURNING *`;

        const result = await client.query(sql, valores);
        return result.rows[0];
    }

    async deletar(client, id) {
        const sql = `DELETE FROM espacos WHERE id = $1 RETURNING *`;
        const result = await client.query(sql, [id]);
        return result.rows[0];
    }
}

module.exports = new Espaco();
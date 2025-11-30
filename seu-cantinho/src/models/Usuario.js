class Usuario {

    async buscarPorEmail(pool, email) {
        const sql = `SELECT * FROM usuarios WHERE email = $1`;
        const result = await pool.query(sql, [email]);
        return result.rows[0];
    }

    async criar(client, dados) {
        const sql = `
            INSERT INTO usuarios (nome, email, cpf, senha, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome, email, role
        `;
        const role = dados.role || 'CLIENTE';

        const result = await client.query(sql, [
            dados.nome,
            dados.email,
            dados.cpf,
            dados.senha,
            role
        ]);
        return result.rows[0];
    }

    async listar(pool) {
        const result = await pool.query('SELECT id, nome, email, role FROM usuarios');
        return result.rows;
    }

    async buscarPorId(pool, id) {
        const result = await pool.query('SELECT id, nome, email, role FROM usuarios WHERE id = $1', [id]);
        return result.rows[0];
    }
}

module.exports = new Usuario();
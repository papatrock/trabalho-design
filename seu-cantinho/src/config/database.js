const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'seucantinho',
    password: process.env.DB_PASS || 'postgres',
    port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
    console.log('Base de Dados conectada');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(), //para transações
};
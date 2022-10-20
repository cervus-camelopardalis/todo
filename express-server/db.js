const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'xxxxx',
    password: 'xxxxx',
    host: 'localhost',
    port: 5432,
    database: 'todo'
});

module.exports = pool;
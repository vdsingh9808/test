const { Pool } = require('pg');

const pool = new Pool({
  user: 'vishwatest', // Update this
  host: 'localhost',
  database: 'postgres',
  password: 'Singh@123', // Update this
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

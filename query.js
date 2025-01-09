const pool = require('./config/db');

async function runQuery() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT NOW()');
      console.log(res.rows[0]);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

runQuery();

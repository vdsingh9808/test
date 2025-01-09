const express = require('express');
const pool = require('./config/db');
const workflowRoutes = require('./routes/workflowRoutes');
const tableRoutes = require('./routes/tableRoutes');
const rateLimitRoutes = require('./routes/rateLimitRoutes');

const app = express();
let port = 3000;

// Middleware example
app.use(express.json());

// Example of a correct middleware function
app.use((req, res, next) => {
  // Middleware logic here
  next();
});

// Example route
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// New status route
app.get('/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/workflow', workflowRoutes);
app.use('/table', tableRoutes);
app.use('/rate-limit', rateLimitRoutes);

const startServer = (port, retries = 5) => {
  if (retries === 0) {
    console.error('Max retries reached. Could not start the server.');
    return;
  }

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying another port...`);
      setTimeout(() => startServer(port + 1, retries - 1), 1000);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(port);

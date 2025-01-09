const pool = require('../config/db');

exports.createWorkflow = async (workflowName, steps) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO workflows (name) VALUES ($1) RETURNING id',
      [workflowName]
    );
    const workflowId = result.rows[0].id;

    for (const step of steps) {
      await client.query(
        'INSERT INTO steps (workflow_id, step_id, type, config) VALUES ($1, $2, $3, $4)',
        [workflowId, step.id, step.type, JSON.stringify(step.config)]
      );
    }
  } finally {
    client.release();
  }
};

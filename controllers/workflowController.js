const pool = require('../config/db');
const workflowService = require('../services/workflowService');

exports.createWorkflow = async (req, res) => {
  const { workflowName, steps } = req.body;
  try {
    await workflowService.createWorkflow(workflowName, steps);
    res.status(201).json({ message: 'Workflow saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

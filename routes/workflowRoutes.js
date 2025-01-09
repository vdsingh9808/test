const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/', workflowController.createWorkflow);

// Define your routes here
router.get('/', (req, res) => {
  res.send('Workflow route');
});

module.exports = router;

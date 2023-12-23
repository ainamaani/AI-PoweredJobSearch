const express = require('express');
const router = express.Router();
const { addNewJob,fetchJobs } = require('../controllers/JobsController')


router.post('/newjob', addNewJob);

router.get('/', fetchJobs);

module.exports = router
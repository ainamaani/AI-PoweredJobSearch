const express = require('express');
const router = express.Router();
const upload = require('../middleware/MulterConfig')
const { createNewProfile, getProfiles } = require('../controllers/ProfileController');

router.post('/newprofile', upload.fields([{name: 'profilePic', maxCount: 1},{name: 'resume', maxCount:1}]) ,createNewProfile)

router.get('/', getProfiles);

module.exports = router
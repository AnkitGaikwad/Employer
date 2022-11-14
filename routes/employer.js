const express = require('express');
const {updateEmployer, registerEmployers, loginEmployers} = require('../controllers/employer');
const authorization = require('../middleware/authentication');

const router = express.Router();

router.route('/').post(loginEmployers).patch(authorization, updateEmployer);
router.route('/register').post(registerEmployers);

module.exports = router;
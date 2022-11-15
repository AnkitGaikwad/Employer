const express = require('express');
const {updateEmployer, registerEmployers, loginEmployers, createEmployee} = require('../controllers/employer');
const authorization = require('../middleware/authentication');

const router = express.Router();

router.route('/').post(loginEmployers).patch(authorization, updateEmployer);
router.route('/register').post(registerEmployers);
router.route('/add').post(authorization, createEmployee);

module.exports = router;
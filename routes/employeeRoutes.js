const express = require('express');
const router = express.Router();
const {getEmpleyee, getEmployees ,updateEmployee , deleteEmployee} = require('../controllers/getEmployeesDataController');
const {register , login , logout} = require('../controllers/authController');
const {authenticate , verify} = require('../middleware/authmiddleware');

router.get('/:id',verify,getEmpleyee);
router.get('/',verify ,getEmployees);
router.post('/register',register);
router.post('/login' ,login);
router.put('/:id' ,verify,updateEmployee);
router.post('/logout' , verify ,logout);
router.delete('/delete/:id',verify,deleteEmployee);
module.exports = router;
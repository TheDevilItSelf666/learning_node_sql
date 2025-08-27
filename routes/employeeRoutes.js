const express = require('express');
const router = express.Router();
const {getEmpleyee, getEmployees ,updateEmployee , deleteEmployee} = require('../controllers/getEmployeesDataController');
const {register , login} = require('../controllers/authController');
const authenticate = require('../middleware/authmiddleware');

router.get('/:id',authenticate,getEmpleyee);
router.get('/',authenticate ,getEmployees);
router.post('/register',register);
router.post('/login' ,login);
router.put('/:id' ,authenticate,updateEmployee);
router.delete('/delete/:id',authenticate,deleteEmployee);
module.exports = router;
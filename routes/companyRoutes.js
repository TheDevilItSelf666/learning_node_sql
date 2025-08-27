const express = require('express');
const router = express.Router();
const {getAllCompaniesData ,getCompanDataById , createcompanyData} = require('../controllers/companyController');


router.get('/' , getAllCompaniesData);
router.get('/:id' ,getCompanDataById);
router.post('/create' , createcompanyData);

module.exports = router;
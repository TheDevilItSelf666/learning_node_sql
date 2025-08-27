const company = require('../models/companyModel');


async function getAllCompaniesData(req, res) {
    try {
        const response = await company.getAllCompanies();
        if (response.length === 0) {
            res.status(404).json({ message: 'Their is no entry in database' });
        }
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error ' });
    }
}


async function getCompanDataById(req, res) {
    try {
        const id = req.params.id;
        const response = await company.getCompanyById(id);
        if (!response) {
            res.status(404).json({ message: 'company not found' });
        }
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function createcompanyData(req, res) {
    try {
        const companyData = req.body;
        const response = await company.createCompany(companyData);

        if (!response) {
            return res.status(400).json({ message: 'Bad request, not able to create a company' });
        }

        res.status(201).json({
            new_company: response,
            message: 'Company added successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { getAllCompaniesData, getCompanDataById , createcompanyData};
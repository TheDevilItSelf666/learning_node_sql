const Employees = require('../models/employesModel');
const bycrypt = require('bcrypt');


async function getEmpleyee( req, res){
    try{
        const id = req.params.id ;
        const employee = await Employees.getEmployeeById(id);
        if(!employee){
            res.status(404).json({message : 'employee not found '});
        }
        res.status(200).json(employee);
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }

}

async function getEmployees(req ,res) {
    try{
        const employees = await Employees.getAllEmployees();
        if(employees.lenght === 0){
            res.status(404).json({message : 'No employees found'});
        }
        res.json(employees);
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }
}   



async function updateEmployee(req, res) {
    try {
        const id = req.params.id;
        const employeeData = req.body;
        const updatedEmployee = await Employees.updateEmployee(id , employeeData);
        if(!updateEmployee){
            res.status(404).json({message : 'employee not found!'});
        }
        res.status(200).json({message : 'employee data is updated successfully' , updatedEmployee});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Internal server error'});
        
    }

}

async function deleteEmployee(req, res) {
    try {
        const id = req.params.id ;
        const result = await Employees.deleteEmployee(id);
        if(result.message === 'emplothisyee is not persent in database'){
            res.status(404).json(result.message);
        }
        res.status(200).json(result.message)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {getEmpleyee, getEmployees  ,updateEmployee , deleteEmployee};
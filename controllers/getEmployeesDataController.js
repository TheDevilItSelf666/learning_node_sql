const Employees = require('../models/employesModel');
const bycrypt = require('bcrypt');


async function getEmpleyee( req, res){
    try{
        const id = req.params.id ;
        const employee = await Employees.getEmployeeById(id);
        if(!employee){
           return res.status(404).json({message : 'employee not found '});
        }
        return res.status(200).json(employee);
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }

}

async function getEmployees(req, res) {
    try {
        const employees = await Employees.getAllEmployees();

        if (!employees || employees.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }

        return res.status(200).json({ data: employees });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}





async function updateEmployee(req, res) {
    try {
        const id = req.params.id;
        const employeeData = req.body;
        const updatedEmployee = await Employees.updateEmployee(id , employeeData);
        if(!updateEmployee){
           return res.status(404).json({message : 'employee not found!'});
        }
        return res.status(200).json({message : 'employee data is updated successfully' , updatedEmployee});
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
            return res.status(404).json(result.message);
        }
        return res.status(200).json(result.message)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {getEmpleyee, getEmployees  ,updateEmployee , deleteEmployee};
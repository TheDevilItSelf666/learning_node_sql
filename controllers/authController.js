const Employees = require('../models/employesModel');
const bycrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();




async function register(req, res) {
    try {
        const {name, position, salary, email , pass} = req.body;

        const hashedPass = await bycrypt.hash(pass, 10);

        const newEmployee = await Employees.createEmployee({name, position, salary, email , pass : hashedPass});
        if(!newEmployee){
            res.status(400).json({message : 'Bad request, could not create employee'});
        }
        res.status(201).json({message : 'Employee created successfully',employee : newEmployee});
    }
     catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }
}



async function login(req , res) {
    try{
        const {email , pass} = req.body;
        const user = await Employees.findByEmail(email);
        if(!user){return res.status(404).json({message : 'Invalid  email'})};

        const isMatch = await bycrypt.compare(pass , user.pass);
        if(!isMatch) {return res.status(404).json({message : 'Invalid password'})}

        const token = await jwt.sign({id : user.emp_id , pos : user.position } , process.env.secret_key , {expiresIn : "1h"});
        res.status(201).json({message: 'Login successfull' , token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }
    
}


module.exports = {register , login}
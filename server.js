const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());
const employeeRoutes = require('./routes/employeeRoutes');
const companyRoutes = require('./routes/companyRoutes');


const logrequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Resuest made to : ${req.originalUrl} `);
    next();
}

app.use(logrequest);


app.use('/employee',logrequest, employeeRoutes);
app.use('/company' ,logrequest , companyRoutes);

app.listen(3000 , () =>{
    console.log('The Server is live !');
});
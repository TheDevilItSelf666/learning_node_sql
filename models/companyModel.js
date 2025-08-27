const db = require('../db');

async function getAllCompanies(){
    const [rows] = await db.query("select * from company");
    return rows;
}

async function getCompanyById(id){
    const [rows] = await db.query("select * from company where company_id = ?" , [id ]);
    return rows[0];
}

async function createCompany(company) {
    const {company_name , location} = company;
    const sql_query = "insert into company (company_name , location) values (? , ?)"

    const [response] =  await db.query(sql_query , [company_name , location]);
    
    return({id : response.insertId , ...company});
}



module.exports = {getAllCompanies , getCompanyById , createCompany};
const db = require('../db');

async function getEmployeeById(id) {
    const [rows] = await db.query("select * from employees where emp_id = ?" , [id]);
    return rows[0];
}

async function getAllEmployees(){
    const [rows] = await db.query("select * from employees");
    return rows;
}

async function createEmployee(employee){
    const {name, position, salary, email , pass} = employee;
    const [result] = await db.query("insert into employees (name, position, salary, email , pass) values (? , ? , ? , ? ,?)" , [name, position, salary, email , pass])
    return {id : result.insertId, ...employee};
}


async function findByEmail(email) {
    const sql  =  "select * from employees where email = ?"
    const [rows] = await db.query(sql , [email]);
    return rows[0];  
}
async function updateEmployee(id, employee) {
    // const {name, position, salary, company_id} = employee;
    // await db.query("update employees set name = ? , position = ? , salary = ? , company_id = ? where emp_id = ?", [name, position, salary, company_id, id]);
    // return {id , ...employee}

    const field = [];
    const values =[];

    for (const key in employee){
        field.push(`${key}= ?`);
        values.push(employee[key]);
    }

    values.push(id);
    const sql = `update employees set ${field.join(', ')} where emp_id = ?`;
    await db.query(sql, values);

    return {id , ...employee};
}

async function deleteEmployee(id) {
   const [rows] = await db.query("delete from employees where emp_id = ?",[id]);
   if(rows.affectedRows ===0 ){
    return {message : 'emplothisyee is not persent in database'};
   }else  return {message : 'employee deleted successfully'};
}

module.exports = {getAllEmployees , getEmployeeById , createEmployee , updateEmployee , deleteEmployee , findByEmail};
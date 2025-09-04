const db = require('../db');

class session{
static async  createSession(id , token) {
    const sql = "INSERT INTO sessions (emp_id, token) VALUES (?, ?)";
    const [result] = await db.query(sql , [id , token]);
    return result.insertId;
}

static async  getSession(id ) {
    const [result] = await db.query("SELECT * FROM sessions WHERE emp_id = ? ", [id]);
    return result[0];
}
static async  deleteSession(id) {
   await db.query("DELETE FROM sessions WHERE emp_id = ?", [id]);
}
}

module.exports = session;
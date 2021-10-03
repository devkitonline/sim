const handler = async (req, res) => {
    return new Promise(((resolve, reject) => {
        const mysql = require('mysql');
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'dotbedu'
        });
        conn.query("select * from users", (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            resolve();
        });
    }));
}
export default handler;

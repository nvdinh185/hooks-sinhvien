const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "students"
};

class StudentController {

    // [GET] /student
    async getListStudents(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const listStudents = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM students`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listStudents);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /student/:id
    async getStudentById(req, res) {
        const id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);
            const studentById = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM students WHERE id = '${id}'`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(studentById[0]);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /student
    async createStudent(req, res) {
        const { id, name, address } = req.body;
        try {
            var conn = mysql.createConnection(configDB);
            await new Promise((resolve, reject) => {
                conn.query(`INSERT INTO students VALUES (?, ?, ?)`,
                    [id, name, address], function (err) {
                        if (err) {
                            // console.log('Lỗi: ' + err);
                            reject(new Error(err.message));
                        }
                        resolve('OK');
                    });
            });
            res.status(200).send('OK');
        } catch (error) {
            console.log('Lỗi: ' + error);
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }

    // [DELETE] /student/:id
    async deleteStudent(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const id = req.params.id;
            await new Promise((resolve, reject) => {
                conn.query(`DELETE FROM students WHERE id = ?`, id, function (err) {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve('OK');
                });
            })
            res.status(200).send("OK");
        } catch (error) {
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }

    // [PUT] /student/:id
    async updateStudent(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const { id, name, address } = req.body;
            await new Promise((resolve, reject) => {
                conn.query(`UPDATE students SET name = ?, address = ? WHERE id = ?`,
                    [name, address, id], function (err) {
                        if (err) {
                            reject(new Error(err.message));
                        }
                        resolve('OK');
                    });
            })
            res.status(200).send('OK');
        } catch (error) {
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }
}

module.exports = new StudentController();

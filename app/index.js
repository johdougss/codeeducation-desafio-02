import express from 'express';
import mysql from 'mysql';

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name)
             VALUES (?)`
connection.query(sql, ['Johnathan'])
connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)

    const sql = `SELECT name
                 FROM people`

    connection.query(sql, function (err, items) {
        if (err) throw err;

        if (err) return res.status(500);

        let html = '<h1>Full Cycle Rocks!</h1>';

        html += '<ul>'
        html += items.map(item => `<li>${item.name}</li>`).join('');
        html += '</ul>'

        return res.send(html);
    })

    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
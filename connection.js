const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pizza_db'
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!')

})

module.exports = connection;
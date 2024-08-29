// models/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL: ', err);
  } else {
    console.log('Conectado ao MySQL...');
  }
});

module.exports = db;

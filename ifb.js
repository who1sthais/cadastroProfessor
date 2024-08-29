const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json()) 
// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ifb'
});

// Connect
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected...');
});

app.get('/', (req, res) => {
  res.send(`
  <h1>Menu</h1>
  <ul>
    <li><a href="/getprofessor">Listar Professor(a)</a></li>
    <li><a href="/deleteprofessor">Apagar Professor(a)</a></li>
    <li><a href="/addprofessor">Apagar Professor(a)</a></li>
  </ul> 
  `);
});

// Insert professor form
app.get('/addprofessor', (req, res) => {
  res.send(`
  <h1>Menu</h1>
  <ul>
    <li><a href="/getprofessor">Listar Professor(a)</a></li>
    <li><a href="/deleteprofessor">Apagar Professor(a)</a></li>
  </ul>
  <br>
    <form action="/addprofessor" method="post">
      <label>Siape:</label>
      <input type="text" name="SIAPE" required><br><br>
      <label>Nome:</label>
      <input type="text" name="nome" required><br><br>
      <label>Idade:</label>
      <input type="number" name="idade" required><br><br>
      <label>Materia:</label>
      <input type="text" name="materia" required><br><br>
      <input type="submit" value="Submit">
    </form>
  `);
});


app.get('/deleteprofessor', (req, res) => {
    res.send(`
    <h1>Menu</h1>
    <ul>
      <li><a href="/addprofessor">Adicionar Professor(a)</a></li>
      <li><a href="/getprofessor">Listar Professor(a)</a></li>
      </ul>
    <br>
      <form action="/deleteprofessor" method="post">
        <label>Siape professor:</label>
        <input type="text" name="SIAPE" required><br><br>
       <br>
        <input type="submit" value="Submit">
      </form>
    `);
  });



  app.post('/deleteprofessor', (req, res) => {
    let query = db.query('DELETE FROM professor where SIAPE=?',
   [req.body.SIAPE],
   (err, result) => {
       if(err) throw err;
       console.log(result);
       res.redirect('/getprofessor');
   });
 });
  

// Insert professor
app.post('/addprofessor', (req, res) => {
   let query = db.query('INSERT INTO professor (SIAPE, idade, nome, materia) Values(?,?,?,?)',
  [req.body.SIAPE,req.body.idade,req.body.nome,req.body.materia],
  (err, result) => {
      if(err) throw err;
      console.log(result);
      res.redirect('/getprofessor');
  });
});

// Select professor
app.get('/getprofessor', (req, res) => {
  let sql = 'SELECT * FROM professor';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send(`
      <h1>Menu</h1>
    <ul>
      <li><a href="/addprofessor">Adicionar Professor(a)</a></li>
      <li><a href="/deleteprofessor">Apagar Professor(a)</a></li>
    </ul>
    <br>
        <table>
          <tr>
            <th>SIAPE</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Matéria</th>
          </tr>
          ${results.map(professor => `<tr><td>${professor.SIAPE}</td><td>${professor.nome}</td><td>${professor.idade}</td><td>${professor.materia}</td></tr>`).join('')}
        </table>
      `);
  });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
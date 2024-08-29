// routes/alunos.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
   res.render('layout', {
        title: 'Menu',
        body: 'professores'
      });
    });
 

// Listar todos os alunos
router.get('/professores', (req, res) => {
    db.query('SELECT * FROM professor', (err, results) => {
      if (err) {
        console.error('Erro ao buscar professores: ', err);
        return res.render('error', { title: 'Erro', message: err.message, error: err });
      }
      res.render('professores', {
        title: 'Lista de Professores',
        body: 'professores',  // Nome do arquivo EJS a ser incluído
        professores: results
      });
    });
  });

// Formulário para adicionar aluno
router.get('/professores/add', (req, res) => {
  res.render('addprofessor', { title: 'Adicionar Professor' });
});

// Adicionar aluno
router.post('/professores/add', (req, res) => {
  const { siape, nome, idade, materia } = req.body;
  db.query('INSERT INTO professor (siape, nome, idade,materia) VALUES (?, ?, ?, ?)', [siape,nome, idade,materia], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar professor: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/professores');
  });
});

// Formulário para apagar aluno
router.get('/professores/delete', (req, res) => {
  res.render('deleteprofessor', { title: 'Apagar Professor' });
});

// Apagar aluno
router.post('/professores/delete', (req, res) => {
  const { siape } = req.body;
  db.query('DELETE FROM professor WHERE siape = ?', [siape], (err, result) => {
    if (err) {
      console.error('Erro ao apagar professor: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/professores');
  });
});

module.exports = router;

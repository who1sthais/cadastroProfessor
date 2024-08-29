// routes/alunos.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
   res.render('layout', {
        title: 'Menu',
        body: 'alunos'
      });
    });
 

// Listar todos os alunos
router.get('/alunos', (req, res) => {
    db.query('SELECT * FROM aluno', (err, results) => {
      if (err) {
        console.error('Erro ao buscar alunos: ', err);
        return res.render('error', { title: 'Erro', message: err.message, error: err });
      }
      res.render('alunos', {
        title: 'Lista de Alunos',
        body: 'alunos',  // Nome do arquivo EJS a ser incluído
        alunos: results
      });
    });
  });

// Formulário para adicionar aluno
router.get('/alunos/add', (req, res) => {
  res.render('addaluno', { title: 'Adicionar Aluno' });
});

// Adicionar aluno
router.post('/alunos/add', (req, res) => {
  const { nome, idade } = req.body;
  db.query('INSERT INTO aluno (nome, idade) VALUES (?, ?)', [nome, idade], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar aluno: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/alunos');
  });
});

// Formulário para apagar aluno
router.get('/alunos/delete', (req, res) => {
  res.render('deletealuno', { title: 'Apagar Aluno' });
});

// Apagar aluno
router.post('/alunos/delete', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM aluno WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao apagar aluno: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/alunos');
  });
});

module.exports = router;

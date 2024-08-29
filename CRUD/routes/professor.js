// routes/professor.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
   res.render('layout', {
        title: 'Menu',
        body: 'professor'
      });
    });
 

// Listar todos os professores
router.get('/professor', (req, res) => {
    db.query('SELECT * FROM professor', (err, results) => {
      if (err) {
        console.error('Erro ao buscar professor: ', err);
        return res.render('error', { title: 'Erro', message: err.message, error: err });
      }
      res.render('professor', {
        title: 'Lista de Professores',
        body: 'professor',  // Nome do arquivo EJS a ser incluído
        professores: results
      });
    });
  });

// Formulário para adicionar Professor
router.get('/professor/add', (req, res) => {
  res.render('addprofessor', { title: 'Adicionar Professor' });
});

// Adicionar Professor
router.post('/professor/add', (req, res) => {
  const { id ,siape, nome, idade } = req.body;
  db.query('INSERT INTO professor (id, siape , nome, idade) VALUES (?, ?, ?, ?)', [id,siape, nome, idade], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar professor: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/professor');
  });
});

// Formulário para apagar professor
router.get('/professor/delete', (req, res) => {
  res.render('deleteprofessor', { title: 'Apagar Professor' });
});

// Apagar professor
router.post('/professor/delete', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM professor WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao apagar professor: ', err);
      return res.render('error', { title: 'Erro', message: err.message, error: err });
    }
    res.redirect('/professor');
  });
});

module.exports = router;

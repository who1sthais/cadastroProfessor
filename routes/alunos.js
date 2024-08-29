// routes/alunos.js
const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Aluno = require('../models/aluno');

//sincroniza o modelo com o banco de dados
sequelize.sync().then(()=>{
  console.log('Banco de dados sincronizado')
});

router.get('/', (req, res) => {
   res.render('layout', {
        title: 'Menu',
        body: 'alunos'
      });
    });
 

// listar todos os alunos
router.get('/alunos', async (req, res) => {
    try{
    const alunos = await Aluno.findAll(); //select * from aluno
    res.status(200);
    req.render('alunos',{
      title: 'Lista de Alunos', body: 'alunos', alunos: alunos
    });}
    catch (error){
      res.status(500);
      return res.render('error',{title: 'Erro', message: error.message, error: error});
    }
    
   
    
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

// formulário para adicionar aluno
router.get('/alunos/alunos/add', (req, res) => {
  res.render('addaluno', { title: 'Adicionar Aluno' });
});

// adicionar aluno
router.post('/alunos/alunos/add', async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201);
    res.redirect('/alunos');
  } catch (error) {
    res.status(400);
    return res.render('error', {title: 'Erro',message:error.message,error:error});
  }
});

// formulário para apagar aluno
router.get('/alunos/delete', (req, res) => {
  res.render('deletealuno', { title: 'Apagar Aluno' });
});

// apagar aluno
router.post('/alunos/delete', async(req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.body.id);
    if (!aluno) {res.status(404);
      return res.render('error', {title:'Erro',
        message:"Aluno não encontrado",error:""})
    }
    await aluno.destroy(); res.status(204); res.redirect('/alunos');
  } catch (error) {res.status(500);
    return res.render('error', {title: 'Erro', message: error.message,error: error})
  }
});

module.exports = router;
const express = require('express');

const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/cadastrar', async (req, res) => {

    const { email } = req.body;

    try{
        if(await Usuario.findOne({ email })) 
            return res.status(400).send({ error: 'Usuário Já Cadastrado' });
        
        
        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;
        return res.send({ usuario });
    }
    catch(err) {
        return res.status(400).send({ error: 'Falha ao Cadastrar Usuário'});
    }
});

router.get('/listar', async (req, res) => {
    try{
        const usuario = await Usuario.find();

        if(usuario.length == 0)
          return res.status(400).send({ error: 'Nenhum Usuário Encontrado' });
          
        res.send({ usuario });
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao buscar Usuário' });
    }
});

module.exports = app => app.use('/usuario', router);
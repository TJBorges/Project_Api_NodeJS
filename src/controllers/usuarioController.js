const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const hash = require('../config/auth.json');

const Usuario = require('../models/Usuario');

const router = express.Router();

function gerarToken(params = {}){
    return jwt.sign(params, hash.secret, {
        expiresIn: 6000,
    });
}

router.post('/cadastrar', async (req, res) => {

    const { email } = req.body;

    try{
        if(await Usuario.findOne({ email })) 
            return res.status(400).send({ error: 'Usuário Já Cadastrado' });
        
        
        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;
        
        return res.send({ usuario, token: gerarToken({ id: usuario.id }) });
    }
    catch(err) {
        return res.status(400).send({ error: 'Falha ao Cadastrar Usuário'});
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if(!usuario)
        return res.status(400).send({ error: 'Email ou Senha Inválidos' });

    if(!await bcrypt.compare(senha, usuario.senha))
        return res.status(400).send({ error: 'Email ou Senha Inválidos' });

        usuario.senha = undefined;

        res.send({ usuario, token: gerarToken({ id: usuario.id }) });
});


module.exports = app => app.use('/usuario', router);
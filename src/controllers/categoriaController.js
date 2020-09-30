const express = require('express');

const Categoria = require('../models/Categoria');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    try{
        const categoria = await Categoria.create(req.body);

        return res.send({ categoria });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Cadastrar'+ err });
    }
});

router.get('/listar', async (req, res) => {
    try{
        const categoria = await Categoria.find();

        if(categoria.length == 0)
          return res.status(400).send({ error: 'Nenhuma Categoria Encontrada' });
          
        res.send({ categoria });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao buscar'+err });
    }
});

router.post('/busca_cod', async (req, res) => {
    try{
        const { codigo } = req.body;
        const categoria = await Categoria.findOne({ codigo });
        
        if(!categoria)
        return res.send(400, 'Categoria não encontrada')

        res.send ({ categoria });    
    }
    catch(error){
        res.send(500, error)
    }
});

router.post('/atualizar', async (req, res) => {
    try{
        const { codigo, descricao } = req.body;
        const categoria = await Categoria.findOne({ codigo });
        
        if(!categoria)
        return res.send(400, 'Categoria não encontrada')

        await Categoria.findByIdAndUpdate(categoria.id, {
            '$set': {
                descricao: descricao
            }
        });
        return res.send({ descricao });
    
    }
    catch(error){
        res.send(500, error)
    }
});

module.exports = app => app.use('/categoria', router);
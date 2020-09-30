const express = require('express');

const Produto = require('../models/Produto');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    try{
        const produto = await Produto.create(req.body);

        return res.send({ produto });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Cadastrar'+ err });
    }
});

router.get('/listar', async (req, res) => {
    try{
        const produto = await Produto.find();

        if(produto.length == 0)
          return res.status(400).send({ error: 'Nenhum Produto Encontrado' });
          
        res.send({ produto });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao buscar'+err });
    }
});

router.post('/busca_cod_barras', async (req, res) => {
    try{
        const { codigo } = req.body;
        const produto = await Produto.findOne({ codigo });
        
        if(!produto)
        return res.send(400, 'Produto Não Encontrado');

        res.send ({ produto });    
    }
    catch(error){
        res.send(500, error);
    }
});

router.post('/atualizar', async (req, res) => {
    try{
        const { codigo, descricao, quantidade, categoria, preco } = req.body;
        const produto = await Produto.findOne({ codigo });
        
        if(!produto)
        return res.send(400, 'Produto não encontrado')

        await Produto.findByIdAndUpdate(produto.id, {
            '$set': {
                descricao: descricao,
                quantidade: quantidade,
                categoria: categoria,
                preco: preco
            }
        });
        return res.send({ produto });
    
    }
    catch(error){
        res.status(400).send({ error: 'Falha ao buscar'+err });
        //res.send(500, error)
    }
});

module.exports = app => app.use('/produto', router);
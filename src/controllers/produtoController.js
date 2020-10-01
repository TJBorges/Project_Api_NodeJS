const express = require('express');

const Produto = require('../models/Produto');

const router = express.Router();

router.post('/cadastrar', async (req, res) => {

    const { codigo } = req.body;

    try{
        if(await Produto.findOne({ codigo })){
            return res.status(400).send({ error: 'Produto Já Cadastrado' });
        }

        const produto = await Produto.create(req.body);
        return res.send({ produto });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Cadastrar Produto' });
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
        return res.status(400).send({ error: 'Falha ao Buscar Produto' });
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
    catch(err){
        return res.status(400).send({ error: 'Falha ao Buscar Produto por Código de Barras' });
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
    catch(err){
        return res.status(400).send({ error: 'Falha ao Atualizar Produto' });
    }
});

router.post('/remover', async (req, res) => {
    try{
        const { codigo } = req.body;
        const produto = await Produto.findOne({ codigo });
        
        if(!produto)
        return res.send(400, 'Produto não encontrado')

        await Produto.findByIdAndDelete(produto.id);
        return res.send({ sucess: 'Produto Removido' });
    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Remover Produto' });
    }
});

module.exports = app => app.use('/produto', router);
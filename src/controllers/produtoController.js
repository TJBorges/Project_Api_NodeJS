const express = require('express');
const authMiddleware = require('../middlewares/autenticador');

const Produto = require('../models/Produto');

const router = express.Router();
router.use(authMiddleware);

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

router.post('/atualizar', async (req, res) => {
    try{
        const { codigo, descricao, quantidade, categoria, preco } = req.body;
        const produto = await Produto.findOne({ codigo });
        
        if(!produto)
        return res.status(400).send({ error: 'Produto Não Encontrado' });

        await Produto.findByIdAndUpdate(produto.id, {
            '$set': {
                descricao: descricao,
                quantidade: quantidade,
                categoria: categoria,
                preco: preco
            }
        });
        return res.send({ sucess: 'Produto \''+ produto.codigo +'\' Atualizado' });
    
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
        return res.status(400).send({ error: 'Produto Não Encontrado' });

        await Produto.findByIdAndDelete(produto.id);
        return res.send({ sucess: 'Produto \''+ produto.codigo +'\' Removido' });
    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Remover Produto' });
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

router.post('/buscar_cod_barras', async (req, res) => {
    try{
        const { codigo } = req.body;
        const produto = await Produto.findOne({ codigo });
        
        if(!produto)
        return res.status(400).send({ error: 'Produto Não Encontrado' });

        res.send ({ produto });    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Buscar Produto por Código de Barras' });
    }
});


module.exports = app => app.use('/produto', router);
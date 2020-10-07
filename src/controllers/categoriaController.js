const express = require('express');
const authMiddleware = require('../middlewares/autenticador');

const Categoria = require('../models/Categoria');

const router = express.Router();
router.use(authMiddleware);

router.post('/cadastrar', async (req, res) => {

    const { codigo } = req.body;

    try{
        if(await Categoria.findOne({ codigo })) 
            return res.status(400).send({ error: 'Categoria Já Cadastrada' });

        const categoria = await Categoria.create(req.body);

        return res.send({ categoria });        
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Cadastrar Categoria' });
    }
});

router.post('/atualizar', async (req, res) => {
    try{
        const { codigo, descricao } = req.body;
        const categoria = await Categoria.findOne({ codigo });
        
        if(!categoria)
        return res.status(400).send({ error: 'Categoria não Encontrada' });

        await Categoria.findByIdAndUpdate(categoria.id, {
            '$set': {
                descricao: descricao
            }
        });
        return res.send({ sucess: 'Categoria \''+ descricao +'\' Atualizada' });
    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Atualizar Categoria' });
    }
});

router.post('/remover', async (req, res) => {
    try{
        const { codigo } = req.body;
        const categoria = await Categoria.findOne({ codigo });
        
        if(!categoria)
        return res.status(400).send({ error: 'Categoria não Encontrada' });

        await Categoria.findByIdAndDelete(categoria.id);
        return res.send({ sucess: 'Categoria \''+ categoria.descricao +'\' Removida' });
    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Remover Categoria' });
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
        return res.status(400).send({ error: 'Falha ao Buscar Categoria' });
    }
});

router.post('/buscar_cod', async (req, res) => {
    try{
        const { codigo } = req.body;
        const categoria = await Categoria.findOne({ codigo });
        
        if(!categoria)
        return res.status(400).send({ error: 'Categoria não Encontrada' });

        res.send ({ categoria });    
    }
    catch(err){
        return res.status(400).send({ error: 'Falha ao Buscar Categoria' });
    }
});


module.exports = app => app.use('/categoria', router);
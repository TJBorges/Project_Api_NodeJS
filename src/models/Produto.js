const mongoose = require('../database');

const ProdutoSchema = new mongoose.Schema({

    codigo: {
        type: String,
        unique: true,
        require: true,
    },
    descricao: {
        type: String,
        require: true,
    },
    quantidade: {
        type: Number,
        require: true,
    },
    categoria: {
        type: Number,
        require: true,
    },
    preco: {
        type: Number,
        require: true,
    },
});

 const Produto = mongoose.model('Produto', ProdutoSchema);

 module.exports = Produto;
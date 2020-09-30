const mongoose = require('../database');

const CategoriaSchema = new mongoose.Schema({

    codigo: {
        type: Number,
        unique: true,
        require: true,
    },
    descricao: {
        type: String,
        require: true,
    },
});

 const Categoria = mongoose.model('Categoria', CategoriaSchema);

 module.exports = Categoria;
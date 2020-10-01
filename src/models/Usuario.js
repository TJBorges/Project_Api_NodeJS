const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    nome: {
        type: String,
        require: true,
    },
    idade: {
        type: Number,
        require: true,
    },
});

UsuarioSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 5);
    this.senha = hash;
    next();
});

 const Usuario = mongoose.model('Usuario', UsuarioSchema);

 module.exports = Usuario;
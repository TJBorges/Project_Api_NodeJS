const jwt = require('jsonwebtoken');
const hash = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
    return res.status(401).send({ error: 'Token não Encontrado' });

    const parts = authHeader.split(' ');

    if(!parts.length == 2)
    return res.status(401).send({ error: 'Erro de Token' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Formato Errado de Token'});

    jwt.verify(token, hash.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token Inválido' });

        req.usuarioID = decoded.id;
        return next();
    });

}
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    res.send('OK');
});

app.listen(process.env.SERVER_PORT);
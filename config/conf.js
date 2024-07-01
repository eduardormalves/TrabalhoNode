const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');

//Configurando o diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

//Configurando o Middleware Body-Parser de JSONs
app.use(bodyParser.json());
//Usando BodyParser para receber dados pela URL
app.use(bodyParser.urlencoded({extended: true}));

//Configurando o Middleware Body-Parser de URL Encoded
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

module.exports = app;
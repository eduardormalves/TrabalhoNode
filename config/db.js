const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beachsoftware'
});

connection.connect((err) => {
    if(err){
        console.error("ERRO!! Conexão falhou!" + err);
        return;
    } else {
        console.log("SUCESSO!! Conectado no banco de dados!");
    }
});

module.exports = connection;

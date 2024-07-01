const app = require('./config/conf');
const connection = require('./config/db');

app.use((req, res, next) => {
	console.log(`${req.method} - ${req.url}`);
	next();
});

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.render('index');
});

app.get('/whats.ejs', (req, res) => {
    res.statusCode = 200;
    res.render('whats');
});

app.get('/index.ejs', (req, res) => {
    res.statusCode = 200;
    res.render('index');
});

app.get('/dayuse.ejs', (req, res) => {
    const query = 'SELECT data, horario_inicio, horario_fim FROM dayuse';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao realizar consulta: ' + err);
            res.status(500).send('Erro ao realizar consulta');
        } else {
            res.render('dayuse', { dayuses: results });
        }
    });
});

app.get('/listaDayUse.ejs', (req, res) => {
    connection.query('SELECT * FROM pessoadayuse;', (err, results, fields) => {
        if (err) {
            console.error("ERRO ao realizar consulta: " + err);
        } else {
            console.log(results);
            res.status(202).render('listaDayUse', { obj_pessoadayuse: results });
        }
    });
});

app.get('/aluguel.ejs', (req, res) => {
    connection.query('SELECT * FROM aluguel;', (err, results, fields) => {
		if(err){
			console.error("ERRO ao realizar consulta: " + err);
		} else {
			console.log(results);
			res.status(202).render('aluguel', {obj_aluguel: results});
		}
	});
});

app.post('/enviaFormAluguel', (req, res) => {
    const {nome, sobrenome, esporte, quadra, horario, data} = req.body;
    const infos = {nome, sobrenome, esporte, quadra, horario, data};

    const query = connection.query('INSERT INTO aluguel set ?', infos, (err, results) => {
        if(err){
			console.error("Erro ao inserir " + err);
			res.status(500).send("Erro ao realizar INSERT");
			return;
		}
		console.log("Aluguel inserido com o ID: " + results.insertId);
    })
	
	res.redirect('/aluguel.ejs')
});

app.post('/delete/:id', (req, res) => {
    const clienteID = req.params.id;

    const sql = "DELETE FROM pessoadayuse WHERE id = ?";
    connection.query(sql, [clienteID], (err, results) => {
        if (err) {
            console.error("Erro ao excluir: " + err);
            res.status(500).json({ error: "Erro ao realizar delete!" });
            return;
        };
        if (results.affectedRows === 0) {
            res.status(404).json({ error: "Pessoa não encontrada" });
            return;
        }
        console.log("Excluindo cliente com o id: " + clienteID);
        res.redirect('/listaDayUse.ejs'); 
    });
});

app.post('/participaDayUse', (req, res) => {
    const { nome, sobrenome } = req.body;
    const infos = { nome, sobrenome };

    connection.query('INSERT INTO PessoaDayUse SET ?', infos, (err, results) => {
        if (err) {
            console.error("Erro ao inserir " + err);
            res.status(500).send("Erro ao realizar INSERT");
            return;
        }
        console.log("Pessoa inserida no DayUse com SUCESSO!");
    });
    res.redirect('/listaDayUse.ejs');
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const novoNome = req.body.novoNome;
    const novoSobrenome = req.body.novoSobrenome;

    const sql = 'UPDATE pessoadayuse SET nome = ?, sobrenome = ? WHERE id = ?';
    connection.query(sql, [novoNome, novoSobrenome, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar nome no banco de dados:', err);
            res.status(500).send('Erro ao atualizar nome.');
            return;
        }
        console.log(`Nome atualizado para ID ${id}`);
        res.redirect('/listaDayUse.ejs');
    });
});

app.get('/listaDayUseData', (req, res) => {
    const query = 'SELECT data, horario_inicio, horario_fim FROM sua_tabela';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao realizar consulta: ' + err);
            res.status(500).send('Erro ao realizar consulta');
        } else {
            res.render('listaDayUseData', { dayuses: results });
        }
    });
});
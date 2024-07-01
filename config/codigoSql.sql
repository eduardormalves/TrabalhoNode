CREATE TABLE aluguel(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    sobrenome VARCHAR(25) NOT NULL,
    esporte VARCHAR(15) NOT NULL,
    quadra INT NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL
);

CREATE TABLE dayuse(
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL
);

CREATE TABLE pessoadayuse(
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    data DATE NOT NULL,
    nome VARCHAR(25) NOT NULL,
    sobrenome VARCHAR(25) NOT NULL
)
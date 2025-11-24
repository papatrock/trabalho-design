-- Criação das Tabelas

CREATE TABLE IF NOT EXISTS filiais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    endereco VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS espacos (
    id SERIAL PRIMARY KEY,
    filial_id INTEGER REFERENCES filiais(id),
    nome VARCHAR(100) NOT NULL,
    capacidade INTEGER NOT NULL,
    preco_base DECIMAL(10, 2) NOT NULL,
    descricao TEXT,
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    espaco_id INTEGER REFERENCES espacos(id),
    data_reserva DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'CONFIRMADA', -- PENDENTE, CONFIRMADA, CANCELADA
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_espaco_data UNIQUE (espaco_id, data_reserva) -- LOCK
);

CREATE TABLE IF NOT EXISTS pagamentos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER REFERENCES reservas(id),
    valor DECIMAL(10, 2) NOT NULL,
    metodo VARCHAR(50), -- CARTAO, DINHEIRO
    status VARCHAR(20) DEFAULT 'APROVADO'
);

------------------------- seeds -----------------------------------

INSERT INTO filiais (nome, estado, endereco) VALUES
('Filial Curitiba', 'PR', 'Rua Curitiba, 100'),
('Filial São Paulo', 'SP', 'Rua São paulo, 200'),
('Filial Rio de Janeiro', 'RJ', 'Rua Janeiro Rio, 300');

INSERT INTO espacos (filial_id, nome, capacidade, preco_base, descricao) VALUES
(1, 'Salão de festas', 200, 1500.00, 'Otimo salão de festas'),
(1, 'Jardim Botanico', 50, 500.00, 'Jardim com flores'),
(2, 'Parque De Eventos Quielse Crisóstomo da Silva', 100, 300.00, 'Maior quadra coberta da america latina'),
(3, 'Chácara', 300, 2000.00, 'Chácara');

INSERT INTO clientes (nome, email, cpf) VALUES
('Tobias da Silva', 'saibot@gmail.com', '111.111.111-11'),
('João Gabriel B', 'joaoDoC++@gmail.com', '222.222.222-22');

INSERT INTO reservas (cliente_id, espaco_id, data_reserva, valor_total, status) VALUES
(1, 1, '2023-12-25', 1500.00, 'CONFIRMADA');

INSERT INTO pagamentos (reserva_id, valor, metodo) VALUES
(1, 1500.00, 'DINHEIRO');
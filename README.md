# Como rodar

versão do docker utilizada: `Docker version 28.3.3, build 980b856`

```bash
$cd seu-cantinho
$docker compose up --build # para instalar as dependencias

# ... gera seeders
app-1  | > seu-cantinho@1.0.0 start
app-1  | > node src/app.js
app-1  | Servidor rodando na porta 3000
app-1  | Frontend: http://localhost:3000
app-1  | Swagger da api: http://localhost:3000/api-docs
```

Usuários para testes:
email: admin@admin.com senha: admin //role admin
email: saibot@gmail.com semja: 123 //role usuario

## Estrututra de pastas

```
seu-cantinho/
├── database/                  # Camada de Persistência (Infraestrutura)
│   └── init.sql               # criação de tabelas e seeds
│
├── src/                       # Código Fonte da Aplicação
│   ├── config/                # Configurações globais
│   │   ├── database.js        # Configuração da conexão com o PostgreSQL
│   │   └── swagger.js         # Configuração da documentação da API (Swagger/OpenAPI)
│   │
│   ├── controllers/           # Camada de Controle
│   │   ├── EspacoController.js
│   │   ├── FilialController.js
│   │   ├── PagamentoController.js
│   │   ├── ReservaController.js
│   │   └── UsuarioController.js
│   │
│   ├── models/                # Camada de Modelo / acesso a Dados
│   │   ├── Espaco.js
│   │   ├── Filial.js
│   │   ├── Usuario.js
│   │   └── reserva.js
│   │
│   ├── public/                # Camada de Visualização (front)
│   │   ├── css/               
│   │   ├── js/                
│   │   ├── admin-espacos.html # Dashboard administrativo (CRUD de Espaços)
│   │   ├── espacos.html       # Dashboard do cliente (Listagem e Reservas)
│   │   ├── index.html         # Página de Login
│   │   └── nova-reserva.html  # Formulário de solicitação de reserva
│   │
│   ├── routes/                # Definição das Rotas
│   │   └── api.js             # Mapeamento de URLs para Controllers e doc Swagger
│   │
│   ├── services/              # Camada de Serviço (Regras de Negócio Core)
│   │   
│   │   ├── EspacoService.js
│   │   ├── FilialService.js
│   │   ├── PagamentoService.js
│   │   ├── ReservaService.js  # Lógica de lock para evitar double-booking tá aqui
│   │   └── UsuarioService.js
│   │
│   └── app.js                 # Entry Point feito com express
│
├── docker-compose.yml         
├── Dockerfile                 
└── package.json               
```



# Diagrama de classes

<img width="1322" height="1157" alt="image" src="https://github.com/user-attachments/assets/9e7efd4a-24a7-4a8e-b557-b9585a201f9f" />

Controller / Service Layer: 
* EspacoService
* PagamentoService
* ReservaService

Model / Domínio:
* Filial (model novo)
* Espaco
* Reserva
* Usuario
* Pagamento

  
# Diagrama de componentes

<img width="920" height="778" alt="image" src="https://github.com/user-attachments/assets/210137c6-1049-40d2-ae24-72de855b7bd1" />


# Fluxo reserva

<img width="882" height="535" alt="image" src="https://github.com/user-attachments/assets/06fb0626-b4c6-4264-b66d-cfc1167a04d1" />

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Seu Cantinho API',
      version: '1.0.0',
      description: 'Documentação da API.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      },
    ],
    components: {
      schemas: {
        Reserva: {
          type: 'object',
          required: ['cliente', 'espacoId', 'data'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID gerado automaticamente pelo banco',
            },
            cliente: {
              type: 'string',
              description: 'Nome do cliente',
            },
            espacoId: {
              type: 'string',
              description: 'ID do espaço a ser reservado',
            },
            data: {
              type: 'string',
              format: 'date',
              description: 'Data da reserva (YYYY-MM-DD)',
            },
            status: {
              type: 'string',
              description: 'Status da reserva (ex: CONFIRMADA)',
            },
          },
          example: {
            cliente: 'Maria',
            espacoId: '1',
            data: '2023-12-25',
          },
        },
        Erro: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    description: 'Mensagem de erro'
                }
            }
        }
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
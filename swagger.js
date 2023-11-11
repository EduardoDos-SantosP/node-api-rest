const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' });

const doc = {
    info: {
        title: 'node-api-rest',
        description: 'API REST com Node.js Express'
    },
    host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes.js'];

swaggerAutogen(outputFile, routes, doc);

import config from '../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Celsius API Documentation',
    version: '0.0.1',
    description: 'This is a node express mongoose API in typescript',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;

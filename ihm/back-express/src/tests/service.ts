import request from 'supertest';
import app from '../app';
const login = async (email: string) => {
  let body = {
    email,
    password: 'test12345',
  }
  const response = await request(app).post('/v1/auth/login').send(body);
  return response.body.tokens.access.token;
};

export default login;

// TODO : Test all *service function and separate in multiple files
import request from 'supertest';
import app from '../../app';
import assert from 'assert';
import login from '../service';
import { dbConnect, dbDisconnect, prepareUsers } from '../config';

let companyId = '';

beforeAll(async () => {
  await dbConnect();
  companyId = await prepareUsers();
});
afterAll(async () => {
  await dbDisconnect();
});
describe('Create User and Delete', () => {
  let delteId = '';
  it('Create User as root without companyId should return a 400', async () => {
    const token = await login('pablo@yopmail.com');
    let body = {
      email: 'test@yopmail.com',
      name: 'raph',
      password: 'test12345',
      role: 'user',
    }
    await request(app).post(
      `/v1/user`).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        assert.strictEqual(response.status, 400);
        let res = JSON.parse(response.text);
        assert.strictEqual(res.message, 'Please provide a company id');
      });
  });
  it('Create User as root should return a 201 status code', async () => {
    const token = await login('doudon_t@etna-alternance.net');
    let body = {
      email: 'test@yopmail.com',
      name: 'raph',
      password: 'test12345',
      role: 'user',
      companyId: companyId,
    }
    await request(app).post(
      `/v1/user`).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 201);
        let res = JSON.parse(response.text);
        delteId = res.newUser.id;
      });
  });
  it('Delete User as user should return a 403 status code', async () => {
    // await setTimeout(1500);
    const token = await login('lequeu_p@etna-alternance.net');
    await request(app)
      .delete(`/v1/user/${delteId}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        assert.strictEqual(response.status, 403);
        let res = JSON.parse(response.text);
        assert.strictEqual(res.message, 'Forbidden');
      });
  });
  it('Delete User as root should return a 201 status code', async () => {
    const token = await login('pablo@yopmail.com');
    await request(app)
      .delete(`/v1/user/${delteId}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        assert.strictEqual(response.status, 200);
      });
  });
  it('Create User as user should return a 403 status code', async () => {
    const token = await login('lequeu_p@etna-alternance.net');
    let body = {
      email: 'test@yopmail.com',
      name: 'raph',
      password: 'test12345',
      role: 'user',
      companyId: companyId,
    }
    await request(app).post(
      `/v1/user`).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
        let res = JSON.parse(response.text)
        assert.strictEqual(res.message, 'Forbidden');
      });
  });
  it('Create User as admin should return a 201 status code', async () => {
    const token = await login('doudon_t@etna-alternance.net');
    let body = {
      email: 'test@yopmail.com',
      name: 'raph',
      password: 'test12345',
      role: 'user',
      companyId: companyId,
    }
    await request(app).post(
      `/v1/user`).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        let res = JSON.parse(response.text);
        delteId = res.newUser.id;
        assert.strictEqual(response.status, 201);
      });
  });
  it('Login new User', async () => {
    let body = {
      email: 'test@yopmail.com',
      password: 'test12345',
    }
    await request(app).post(
      `/v1/auth/login`).send(body)
      .then((response) => {
        assert.strictEqual(response.status, 200);
      });
  });
  it('Delete User as admin should return a 201 status code', async () => {
    const token = await login('doudon_t@etna-alternance.net');
    await request(app)
      .delete(`/v1/user/${delteId}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        assert.strictEqual(response.status, 200);
      });
  });
});

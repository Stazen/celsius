import request from 'supertest';
import app from '../../app'; // Adjust the path to your app module
import assert from 'assert';

describe('Health', () => {
  it('/v1/health should return a 200 status code', async () => {
    const response = await request(app).get('/v1/health');
    assert.strictEqual(response.status, 200);
  });

  it('Service is running!', async () => {
    const response = await request(app).get('/v1/health');
    assert.strictEqual(response.status, 200);
    assert.equal(response.text, 'Service is running !');
  });
});

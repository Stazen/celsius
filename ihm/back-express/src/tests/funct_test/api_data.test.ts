import request from 'supertest';
import assert from 'assert';
import app from '../../app';
import login from '../service';
import { dbConnect, dbDisconnect, prepareData } from '../config';
let companyId = '';

beforeAll(async () => {
  await dbConnect();
  companyId = await prepareData();

});
afterAll(async () => {
  await dbDisconnect();
});

describe('Data check', () => {
  let token = '';
  let sensorId = '';
  let building = '';
  let floorId = '';
  let room = '';
  const interval = ['0', '1', '2', '3'];
  it('Get data not auth', async () => {
    await request(app).get(`/v1/data`).then((response) => {
      // Votre logique en cas de succès
      assert.strictEqual(response.status, 401);
    });
  });
  it('Get data no sensor', async () => {
    token = await login('doudon_t@etna-alternance.net');
    await request(app)
      .get(`/v1/data`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 404);
      });
  });
  it('Get data detail no interval', async () => {
    await request(app)
      .get(`/v1/data/details?sensorId=3`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 404);
      });
  });
  it('Get data detail no sensor', async () => {
    await request(app)
      .get(`/v1/data/details?interval=0`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 404);
      });
  });
  it('Create company as user', async () => {
    token = await login('lequeu_p@etna-alternance.net');
    let body = {
      name: 'Visian',
      address: '1 rue de la bichon',
      city: 'Paris',
      postalCode: '75000',
      country: 'France',
    };
    await request(app)
      .post(
        `/v1/company`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Create building as user', async () => {
    let body = {
      name: 'B1',
      address: '12 rue du chateau',
      city: 'Alger',
      postalCode: '54899',
      country: 'Algerie',
      companyId: companyId,
    }
    await request(app)
      .post(
        `/v1/building`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Create building as admin wrong body', async () => {
    token = await login('doudon_t@etna-alternance.net');
    let body = {
      name: 'Test',
      address: '12 rue du Test',
      city: 'Testari',

      postalCode: '00000',
      country: 'Testland',
      companyId: '6Blue',
    };
    await request(app)
      .post(
        `/v1/building`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 400);
      });
  });
  it('Get building as admin', async () => {
    await request(app)
      .get(`/v1/building`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        let res = JSON.parse(response.text);

        sensorId = res.building[0].floor[0].rooms.map((e: any) => e.captors[0]);
        assert.strictEqual(response.status, 200);
      });
  });
  it('Get data detail', async () => {
    Array.isArray(sensorId) && sensorId.map(async (s: string) => {
      interval.map(async (i) => {
        await request(app)
          .get(`/v1/data/details?sensorId=${s}&interval=${i}`).set('Authorization', `Bearer ${token}`)
          .then((response) => {
            // Votre logique en cas de succès
            assert.strictEqual(response.status, 200);
          });
      });
    });
  });
  it('Create room as admin wrong body', async () => {
    let body = {
      name: 'Test',
      building: 'Testari',
    };
    await request(app)
      .post(
        `/v1/room`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 400);
      });
  });
  it('Create room as user', async () => {
    const id = building;
    token = await login('lequeu_p@etna-alternance.net');
    let body = {
      name: 'Test',
      building: id,
      floor: 'Testfloor',
    };
    await request(app)
      .post(
        `/v1/room`).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Create building as admin correct body', async () => {
    token = await login('doudon_t@etna-alternance.net');
    let body = {
      name: 'Test',
      address: '12 rue du Test',
      city: 'Testari',
      postalCode: '00000',
      country: 'Testland',
    };
    await request(app)
      .post(
        `/v1/building`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 201);
      });
  });
  it('Get building as admin should return a 201 status code', async () => {
    token = await login('doudon_t@etna-alternance.net');
    await request(app)
      .get(`/v1/building`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        let res = JSON.parse(response.text);

        building = res.building[1].id;
        assert.strictEqual(response.status, 200);
      });
  });
  it('Create Floor as admin wrong body', async () => {
    let body = {
      name: 'Test',
      buildingId: building,
      floor: 'Testfloor',
    };
    await request(app)
      .post(
        `/v1/floor`,
      ).set('Authorization', `Bearer ${token}`).send(body)

      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 400);
      });
  });
  it('Create Floor as admin', async () => {
    let body = {
      buildingId: building,
      number: '1',
    };
    await request(app)
      .post(
        `/v1/floor`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        let res = JSON.parse(response.text);

        [floorId] = res.data.floor;
        assert.strictEqual(response.status, 201);
      });
  });
  it('Create Room as admin', async () => {
    const id = building;
    let body = {
      name: 'Test',
      building: id,
      floor: floorId,
    }
    await request(app)
      .post(
        `/v1/room`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        let res = JSON.parse(response.text);

        room = res.room.id;

        assert.strictEqual(response.status, 201);
      });
  });
  it('Create Floor as user', async () => {
    token = await login('lequeu_p@etna-alternance.net');
    let body = {
      name: 'Test',
      buildingId: building,
      number: 1,
    };
    await request(app)
      .post(
        `/v1/floor`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Create Room as user', async () => {
    let body = {
      name: 'Test',
      buildingId: building,
      floor: floorId,
    }
    await request(app)
      .post(
        `/v1/room`,
      ).set('Authorization', `Bearer ${token}`).send(body)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Delete Room as user should return a 403 status code', async () => {
    await request(app)
      .delete(`/v1/room/${room}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Delete Floor as user should return a 403 status code', async () => {
    await request(app)
      .delete(`/v1/floor/${floorId}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Delete Building as user should return a 403 status code', async () => {
    await request(app)
      .delete(`/v1/building/${building}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 403);
      });
  });
  it('Delete Room as admin should return a 403 status code', async () => {
    token = await login('doudon_t@etna-alternance.net');
    await request(app)
      .delete(`/v1/room/${room}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 200);
      });
  });
  it('Delete Floor as admin should return a 403 status code', async () => {
    await request(app)
      .delete(`/v1/floor/${floorId}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 200);
      });
  });
  it('Delete building as admin should return a 201 status code', async () => {
    await request(app)
      .delete(`/v1/building/${building}`).set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // Votre logique en cas de succès
        assert.strictEqual(response.status, 200);
      });
  });
});

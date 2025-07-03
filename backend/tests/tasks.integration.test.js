// tasks.integration.test.js
const request = require('supertest');
const app = require('./server');

let token;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: 'admin@test.com',
    password: 'password'
  });
  token = res.body.token;
});

describe('Tasks API', () => {
  test('GET /api/tasks should return tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nouvelle tâche',
        description: 'Détails de la tâche',
        priority: 'high'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Nouvelle tâche');
  });

  test('PUT /api/tasks/:id should update task', async () => {
    const newTask = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'À mettre à jour' });

    const updateRes = await request(app)
      .put(`/api/tasks/${newTask.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.status).toBe('done');
  });

  test('DELETE /api/tasks/:id should remove task', async () => {
    const task = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'À supprimer' });

    const res = await request(app)
      .delete(`/api/tasks/${task.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});

// auth.integration.test.js
const request = require('supertest');
const app = require('./server');

describe('Auth routes', () => {
  test('Register should create user and return token', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'newuser@test.com',
      password: 'test123',
      name: 'New User'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('newuser@test.com');
  });

  test('Login with valid credentials should return token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@test.com',
      password: 'password'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Login with wrong password should fail', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@test.com',
      password: 'wrong'
    });
    expect(res.statusCode).toBe(400);
  });
});

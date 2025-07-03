// auth.test.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

test('bcrypt hash and compare should succeed', async () => {
  const password = 'test123';
  const hash = await bcrypt.hash(password, 10);
  const isValid = await bcrypt.compare(password, hash);
  expect(isValid).toBe(true);
});

test('JWT should encode and decode payload', () => {
  const token = jwt.sign({ userId: '1' }, 'secret_test');
  const decoded = jwt.verify(token, 'secret_test');
  expect(decoded.userId).toBe('1');
});

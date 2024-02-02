import request from 'supertest';
import express from 'express';
import routes from '../../../../Routes/routes';
const app = express();
app.use(routes);

describe(`GET /v1/users/`, () => {
  it('should respond with status 200 and a success status', async () => {
    const response = await request(app).get(`/v1/users/`);
    expect(response.statusCode).toBe(200);
  });
});

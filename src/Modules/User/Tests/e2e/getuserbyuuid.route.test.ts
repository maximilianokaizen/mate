import request from 'supertest';
import express from 'express';
import routes from '../../../../Routes/routes';
const app = express();
app.use(routes);

const uuid = '18b1992a-2cc8-454b-94e3-e69f6610905c';
describe(`GET /v1/users/${uuid}`, () => {
  it('should respond with status 200 and a success status', async () => {
    const response = await request(app).get(`/v1/users/${uuid}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true
      })
    );
  });
});

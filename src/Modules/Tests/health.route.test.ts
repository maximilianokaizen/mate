import request from 'supertest';
import express from 'express';
import routes from '../../Routes/routes';
const app = express();
app.use(routes);

describe('GET /health', () => {
  it('should respond with status 200 and a success message', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Success'
    });
  });
});

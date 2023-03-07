import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import File from '../utils/file';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=sogoku.png (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=sogoku.png'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=sogoku.png&width=200&height=200 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=sogoku.png&width=200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=sogoku.png&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=sogoku.png&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imgThumb,
    'sogoku-200x200.png'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    //
  }
});

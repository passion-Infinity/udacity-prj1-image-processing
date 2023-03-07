import express from 'express';
import logger from '../utils/logger';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get('/', logger, (req: express.Request, res: express.Response) => {
  res.send('Visit endpoint http://localhost:3000/api/images to process images');
});

export default routes;

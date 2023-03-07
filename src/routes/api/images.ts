import express from 'express';
import File from '../../utils/file';
import logger from '../../utils/logger';

const images: express.Router = express.Router();

images.get(
  '/',
  logger,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validationMessage = await File.validate(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }

    let error: null | string = '';

    if (!(await File.checkAvailableThumb(req.query))) {
      error = await File.createThumb(req.query);
    }

    if (error) {
      res.send(error);
      return;
    }

    const path: null | string = await File.getImagePath(req.query);
    if (path) {
      res.sendFile(path);
    } else {
      res.send('Failed to getImagePath');
    }
  }
);

export default images;

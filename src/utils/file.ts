import path from 'path';
import { ImageQuery } from '../models/query';
import processImage from './imageProccessing';
import fs from 'fs/promises';
import { ImageExtension } from '../models/constant';

export default class File {
  static imgFull = path.resolve(__dirname, '../../assets/images/full');
  static imgThumb = path.resolve(__dirname, '../../assets/images/thumb');

  static async getImagePath(params: ImageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    const name = params.filename.split('.')[0];
    const type = params.filename.split('.')[1];
    const extension = File.getImageExtension(type);

    const filePath: string =
      params.width && params.height
        ? path.resolve(
            File.imgThumb,
            `${name}-${params.width}x${params.height}.${extension}`
          )
        : path.resolve(File.imgFull, `${params.filename}`);

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static async checkAvailableImage(filename = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }
    return (await File.getAvailableImageNames()).includes(filename);
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imgFull)).map(
        (filename: string): string => filename
      );
    } catch {
      return [];
    }
  }

  static async checkAvailableThumb(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }

    const name = params.filename.split('.')[0];
    const type = params.filename.split('.')[1];
    const extension = File.getImageExtension(type);

    const filePath: string = path.resolve(
      File.imgThumb,
      `${name}-${params.width}x${params.height}.${extension}`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imgThumb);
    } catch {
      fs.mkdir(File.imgThumb);
    }
  }

  static async createThumb(params: ImageQuery): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const name = params.filename.split('.')[0];
    const type = params.filename.split('.')[1];
    const extension = File.getImageExtension(type);

    const filePathFull: string = path.resolve(
      File.imgFull,
      `${params.filename}`
    );
    const filePathThumb: string = path.resolve(
      File.imgThumb,
      `${name}-${params.width}x${params.height}.${extension}`
    );

    console.log(`Thumb path: ${filePathThumb}`);

    return await processImage({
      source: filePathFull,
      target: filePathThumb,
      type: extension,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }

  static validate = async (query: ImageQuery): Promise<null | string> => {
    if (!(await File.checkAvailableImage(query.filename))) {
      const availableImageNames: string = (
        await File.getAvailableImageNames()
      ).join(', ');
      return `Please pass an available filename to view orginal image.
                    The available filenames are: ${availableImageNames}.
                    Example: /api/images?filename=abc.jpg
                    If you want to resize image, pass width and height.
                    Example: /api/images?filename=abc.jpg&width=50&height=50`;
    }

    if (!query.width && !query.height) {
      return null;
    }

    const width: number = parseInt(query.width || '');
    if (Number.isNaN(width) && width < 1) {
      return 'Please pass an available width in query segment.';
    }

    const height: number = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
      return 'Please pass an available height in query segment.';
    }

    return null;
  };

  static getImageExtension = (type: string): ImageExtension => {
    let extension: ImageExtension = 'jpg';
    if (type === 'jpeg' || type === 'png') {
      extension = type;
    }
    return extension;
  };
}

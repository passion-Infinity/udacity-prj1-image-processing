import sharp from 'sharp';
import { SharpParams } from '../models/sharp';

const processImage = async (params: SharpParams): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat(params.type)
      .toFile(params.target);
    return null;
  } catch {
    return 'Process could not be done!!!';
  }
};

export default processImage;

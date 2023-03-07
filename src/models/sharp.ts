import { ImageExtension } from './constant';

export interface SharpParams {
  source: string;
  target: string;
  type: ImageExtension;
  width: number;
  height: number;
}
